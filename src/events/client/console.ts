import { type QueryMcFlurry, Event } from '@classes';
import { createBox, Querylog } from '@loggers';

export default class Ready extends Event<'ready'> {
  constructor(client: QueryMcFlurry) {
    super(client, {
      name: 'ready',
      description: 'Ready Event',
      listen: 'once',
    });
  }

  async execute() {
    console.clear();
    console.log('\n');
    createBox(`${this.client.user.username} is ready!`, {
      color: 'success',
      center: true,
    });

    const userCount = `${this.client.users.size} users`;
    const serverCount = `${this.client.guilds.size} servers`;


    Querylog(`${userCount} | ${serverCount}`, true);
    Querylog("----------------------------------------", true);
    this.client.handler.loadCommands();
  }
}
