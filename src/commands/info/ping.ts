import { Command, QueryMcFlurry } from "@base/classes";
import { Category } from "@base/enums";
import { Reply } from "@helpers";
import type { CommandInteraction } from "oceanic.js";

export default class Ping extends Command {
    constructor(client: QueryMcFlurry) {
        super(client, {
            name: "ping",
            description: "Ping the bot",
            category: Category.Information,
            options: [],
            default_member_permissions: 0n,
            dm_permission: true,
            visibility: "public",
            cooldown: {
                type: "user",
                duration: 60000
            }
        });
    }
    
    execute(interaction: CommandInteraction): void {
        Reply(interaction, "🏓", "Pong!", false, { embed: true, type: "success" });
    }
}
