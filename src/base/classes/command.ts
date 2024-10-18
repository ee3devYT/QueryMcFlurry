import type { CommandOptionsType, CommandType, CooldownType } from "@typings"
import type { QueryMcFlurry } from "@classes"
import type { Category } from "@enums"
import { CommandInteraction } from "oceanic.js"

export class Command implements CommandType {
    client: QueryMcFlurry
    name: string
    description: string
    category: Category
    options: object
    default_member_permissions: bigint
    dm_permission: boolean
    cooldown: CooldownType
    visibility: CommandType["visibility"]
    constructor(client: QueryMcFlurry, options: CommandOptionsType) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.category = options.category
        this.options = options.options
        this.default_member_permissions = options.default_member_permissions
        this.dm_permission = options.dm_permission
        this.cooldown = options.cooldown
        this.visibility = options.visibility
    }
    execute(interaction: CommandInteraction): void {}
}
