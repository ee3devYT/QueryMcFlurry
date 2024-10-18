import { Command, QueryMcFlurry } from "@base/classes";
import { Category } from "@base/enums";
import type { CommandInteraction } from "oceanic.js";

export default class Ping extends Command {
    constructor(client: QueryMcFlurry) {
        super(client, {
            name: "test",
            description: "Ping the bot",
            category: Category.Information,
            options: [],
            default_member_permissions: 0n,
            dm_permission: true,
            cooldown: {
                type: "user",
                duration: 10000
            },
            visibility: "public"
        });
    }
    
    execute(interaction: CommandInteraction): void {
        interaction.createMessage({
            content: `test!`
        });
    }
}
