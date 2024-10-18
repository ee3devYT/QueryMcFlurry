import type { QueryMcFlurry } from "@classes";
import type { Category } from "@enums";
import { CommandInteraction, type ClientEvents } from "oceanic.js"
export type QueryMcFlurryApplicationType = {
  initalize: () => void;
};

export type HandlerType = {
  loadEvents(): void;
  loadCommands(): void;
};
export type EventListenerType = "once" | "always"

export type EventType<T extends keyof ClientEvents> = {
  client: QueryMcFlurry;
  name: T;
  description: string;
  listen: EventListenerType;
}

export type EventOptionsType<T extends keyof ClientEvents> = {
  name: T;
  description: string;
  listen: EventListenerType;
}


export type CommandScope = "private" | "public"

export type CooldownType = {
  type: 'guild' | 'user';
  duration: number;
};

export type CommandType = {
  client: QueryMcFlurry
  name: string
  description: string
  category: Category
  options: object
  default_member_permissions: bigint
  dm_permission: boolean,
  cooldown: CooldownType,
  visibility: CommandScope
  execute(interaction: CommandInteraction): void
}

export type CommandOptionsType = {
  name: string
  description: string
  category: Category
  options: object
  default_member_permissions: bigint
  dm_permission: boolean,
  cooldown: CooldownType,
  visibility: CommandScope
}
