import type { ClientEvents } from "oceanic.js";
import type { EventOptionsType, EventType } from "@typings";
import type { QueryMcFlurry } from "./queryMcFlurry";

export class Event<T extends keyof ClientEvents> implements EventType<T> {
  client: QueryMcFlurry;
  name: T;
  description: string;
  listen: EventType<T>["listen"];

  constructor(client: QueryMcFlurry, options: EventOptionsType<T>) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
    this.listen = options.listen;
  }

  execute(...args: ClientEvents[T]): void {}
}
