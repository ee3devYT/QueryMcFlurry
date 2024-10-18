import { type QueryMcFlurry, Command, Event } from '@classes';
import { Reply } from '@helpers';
import prisma from '@prisma';
import type { CommandInteraction } from 'oceanic.js';

export default class SlashCommand extends Event<'interactionCreate'> {
  constructor(client: QueryMcFlurry) {
    super(client, {
      name: 'interactionCreate',
      description: 'Slash Command Interaction',
      listen: 'always',
    });
  }

  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command: Command = this.client.commands.get(interaction.data.name)!;

    if (!command)
      return (
        (await interaction.createMessage({
          content:
            'This command does not exist!\n-# join our support server for more info',
          flags: 64,
        })) && this.client.commands.delete(interaction.data.name)
      );

    if (
      command.visibility === 'private' &&
      !process.env.PRIVATE_COMMAND_USER_IDS.includes(interaction.user.id)
    ) {
      return Reply(
        interaction,
        '❌',
        'This command is private and only accessible to authorized users. -# join our support server for more info',
        true,
        { type: 'error' },
      );
    }

    // Check for cooldown
    const cooldownType = command.cooldown.type;
    const targetId =
      cooldownType === 'guild' ? interaction.guild!.id : interaction.user.id;

    const existingCooldown = await prisma.cooldown.findUnique({
      where: {
        type_targetId_command: {
          type: cooldownType,
          targetId: targetId,
          command: interaction.data.name,
        },
      },
    });

    if (existingCooldown) {
      const expiresAt = existingCooldown.expiresAt.getTime();
      if (expiresAt > Date.now()) {
        const cooldownScope = cooldownType === 'guild' ? 'this server' : 'you';
        return Reply(
          interaction,
          '⏳',
          `This command is on cooldown for ${cooldownScope}. It can be used again <t:${Math.floor(expiresAt / 1000)}:R>.`,
          true,
          { embed: true, type: 'info' },
        );
      } else {
        // Cooldown has expired, delete it
        await prisma.cooldown.delete({
          where: { id: existingCooldown.id },
        });
      }
    }

    try {
      await command.execute(interaction);

      await prisma.cooldown.create({
        data: {
          type: cooldownType,
          targetId: targetId,
          command: interaction.data.name,
          expiresAt: new Date(Date.now() + command.cooldown.duration),
        },
      });
    } catch (error) {
      console.error('Error executing command:', error);
      Reply(
        interaction,
        '❌',
        'An error occurred while executing this command. Please try again later.',
        true,
        { type: 'error' },
      );
    }
  }
}
