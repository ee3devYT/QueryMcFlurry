import { CommandInteraction, type InteractionContent, Message } from "oceanic.js";
import { QueryMcFlurryColors } from "@constants";
import { z } from "zod";

type EmbedType = keyof typeof QueryMcFlurryColors;

const embedColors: Record<EmbedType, number> = QueryMcFlurryColors;

const DISCORD_MESSAGE_LIMIT = 2000 as const;

const ReplySchema = z.object({
  source: z.union([
    z.instanceof(CommandInteraction),
    z.instanceof(Message)
  ]),
  emoji: z.string().optional(),
  message: z.string().max(DISCORD_MESSAGE_LIMIT, {
    message: `Message exceeds Discord's character limit of ${DISCORD_MESSAGE_LIMIT}`
  }),
  isEphemeral: z.boolean().default(false),
  options: z.object({
    embed: z.boolean().optional(),
    type: z.enum(Object.keys(QueryMcFlurryColors) as [EmbedType, ...EmbedType[]]).optional()
  }).default({})
});

export async function Reply(
  source: CommandInteraction | Message,
  emoji: string | undefined,
  message: string,
  isEphemeral: boolean = false,
  options: { embed?: boolean; type?: EmbedType } = {},
): Promise<void> {

  const validatedParams = ReplySchema.parse({ source, emoji, message, isEphemeral, options });

  const content = validatedParams.emoji ? `**\`${validatedParams.emoji}\`** | ${validatedParams.message}` : validatedParams.message;

  const embedColor = validatedParams.options.type
    ? embedColors[validatedParams.options.type]
    : embedColors.default;

  const replyOptions: InteractionContent = {
    content: validatedParams.options.embed ? undefined : content,
    embeds: validatedParams.options.embed
      ? [{ description: content, color: embedColor }]
      : undefined,
    flags: isEphemeral ? 64 : undefined,
  };

  try {
    if (source instanceof CommandInteraction) {
      await source.createMessage(replyOptions);
    } else if (source instanceof Message) {
      await source.channel?.createMessage({
        ...replyOptions,
        messageReference: { messageID: source.id },
      });
    } else {
      throw new Error("Invalid source type");
    }
  } catch (error) {
    console.error("Failed to send reply:", error);
    throw new Error("Failed to send reply");
  }
}
