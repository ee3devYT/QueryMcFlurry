import { Client, Collection } from 'oceanic.js';
import { config as dotenvConfig } from 'dotenv';
import type { HandlerType, QueryMcFlurryApplicationType } from '@typings';
import { Command, Handler } from '@classes';

export class QueryMcFlurry
  extends Client
  implements QueryMcFlurryApplicationType
{
  handler: HandlerType;
  commands: Collection<string, Command>
  constructor() {
    dotenvConfig();
    super({
      auth: `Bot ${process.env.DISCORD_AUTH_TOKEN}`,
      gateway: {
        intents: ["ALL"]
      }
    });
    this.handler = new Handler(this);
    this.commands = new Collection();
  }

  initalize(): void {
    this.connect();
    this.handler.loadEvents();
  }
}
