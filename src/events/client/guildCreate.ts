import { QueryMcFlurry, Event } from '@classes';
import prisma from '@prisma';
import { Querylog } from '@utils/helpers/loggers';
import type { Guild } from 'oceanic.js';

export default class GuildCreate extends Event<'guildCreate'> {
  constructor(client: QueryMcFlurry) {
    super(client, {
      name: 'guildCreate',
      description: 'Guild Create Event',
      listen: 'always',
    });
  }

  async execute(guild: Guild) {
    const { id } = guild;

    const guildExists = await prisma.guild.findUnique({
      where: { guildId: id },
    });

    if (!guildExists) {
      await prisma.guild.create({
        data: {
          guildId: id,
          prefix: '!',
        },
      });
    }

    Querylog(`${guild.name} has been added to the database`, true);
  }
}