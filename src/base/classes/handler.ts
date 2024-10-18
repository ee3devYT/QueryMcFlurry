import type { HandlerType } from "@typings";
import type { QueryMcFlurry, Event, Command } from "@classes";
import type { ClientEvents } from "oceanic.js";
import { glob } from "glob";
import path from "path";
import { ApplicationCommandTypes, type CreateApplicationCommandOptions, type ApplicationCommandOptions } from "oceanic.js";
import { Table } from 'console-table-printer';
import { QueryWarn } from "@loggers";

export class Handler implements HandlerType {

    client: QueryMcFlurry;

    constructor(client: QueryMcFlurry) {
        this.client = client;
    }

    private loadedEvents: string[] = [];
    private loadedCommands: { name: string; isPrivate: boolean }[] = [];

    async loadEvents(): Promise<void> {
        const files = (await glob(`src/events/**/*.ts`)).map(
            (filePath: string) => path.resolve(filePath)
        )

        files.map(async (file: string) => {
            const EventClass = (await import(file)).default
            const event: Event<keyof ClientEvents> = new EventClass(this.client)

            if (!('name' in event))
                return (
                    delete require.cache[require.resolve(file)] &&
                    console.log(`${file.split('/').pop()} does not have a name`)
                )

            if (!('execute' in event) || typeof event.execute !== 'function')
                return (
                    delete require.cache[require.resolve(file)] &&
                    console.log(
                        `${file.split('/').pop()} does not have an execute method`
                    )
                )

            const execute = (...args: ClientEvents[keyof ClientEvents]) => {
                if (typeof event.execute === 'function') {
                    return event.execute(...args)
                } else {
                    console.error(
                        `${file.split('/').pop()} has an invalid execute method`
                    )
                }
            }

            if ('listen' in event && event.listen === 'once') {
                this.client.once(event.name as keyof ClientEvents, execute)
            } else {
                this.client.on(event.name as keyof ClientEvents, execute)
            }

            this.loadedEvents.push(event.name);

            return delete require.cache[require.resolve(file)]
        })


    }
    async loadCommands(): Promise<void> {
        const files = (await glob(`src/commands/**/*.ts`)).map(
            (filePath: string) => path.resolve(filePath)
        )

        const globalCommands: CreateApplicationCommandOptions[] = [];
        const privateCommands: CreateApplicationCommandOptions[] = [];

        for (const file of files) {
            const command: Command = new (await import(file)).default(this.client)

            if (typeof command !== 'object') {
                console.log(`${file.split('/').pop()} is not exporting a class`)
                continue
            }

            if (!command.name) {
                console.log(`${file.split('/').pop()} does not have a name`)
                continue
            }

            this.client.commands.set(command.name, command as Command)

            const commandData: CreateApplicationCommandOptions = {
                name: command.name,
                description: command.description,
                type: ApplicationCommandTypes.CHAT_INPUT,
                options: command.options as ApplicationCommandOptions[] || []
            };

            if (command.visibility === 'private') {
                privateCommands.push(commandData);
            } else {
                globalCommands.push(commandData);
            }

            this.loadedCommands.push({ name: command.name, isPrivate: command.visibility === 'private' });

            delete require.cache[require.resolve(file)]
        }

        // Register global commands
        if (globalCommands.length > 0) {
            await this.client.application.bulkEditGlobalCommands(globalCommands);

        }

        // Register private commands to the specified guild
        if (privateCommands.length > 0) {
            const privateGuildIds = process.env.PRIVATE_GUILDS?.split(',').map(id => id.trim()) || [];
            for (const guildId of privateGuildIds) {
                try {
                    await this.client.application.bulkEditGuildCommands(guildId, privateCommands);
                } catch (error) {
                    console.error(`Failed to register commands for guild ${guildId}:`, error);
                }
            }
        }

        this.printLoadedTable();
    }

    private printLoadedTable(): void {
        const events = this.loadedEvents;
        const commands = this.loadedCommands.map(c => `${c.name}${c.isPrivate ? ' *' : ''}`);
        const eventHeader = 'EVENTS';
        const commandHeader = 'COMMANDS';
    
        const table = new Table({
            columns: [
                { name: eventHeader, alignment: 'center', title: 'EVENTS', maxLen: 20 },
                { name: commandHeader, alignment: 'center', title: 'COMMANDS', maxLen: 20 }
            ]
        });
    
        const maxRows = Math.max(events.length, commands.length);
        for (let i = 0; i < maxRows; i++) {
            const event = events[i] || '';
            const command = commands[i] || '';
            table.addRow(
                { [eventHeader]: ` ${event} `, [commandHeader]: ` ${command} ` },
                { color: 'cyan' }
            );
        }
    
        const tableString = table.render();
        const tableLines = tableString.split("\n");

        const terminalWidth = process.stdout.columns;
        const longestLine = Math.max(...tableLines.map(line => line.length));
        const basePadding = Math.floor((terminalWidth - longestLine) / 2);
    
        const adjustedPadding = basePadding + 18; 

        const alignText = (text: string) => ' '.repeat(adjustedPadding) + text;

        tableLines.forEach(line => {
            console.log(alignText(line));
        });
        QueryWarn('* indicates private command', true);
        }
    
    
    
}
