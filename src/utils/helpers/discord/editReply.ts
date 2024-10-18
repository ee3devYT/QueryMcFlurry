import { CommandInteraction, type InteractionContent, Message } from "oceanic.js";
import { QueryMcFlurryColors } from "@constants";
import { z } from "zod";

type EmbedType = keyof typeof QueryMcFlurryColors;

const embedColors: Record<EmbedType, number> = QueryMcFlurryColors;

const DISCORD_MESSAGE_LIMIT = 2000 as const;

const EditReplySchema = z.object({
  source: z.union([
    z.instanceof(CommandInteraction),
    z.instanceof(Message)
  ]),
  emoji: z.string().optional(),
  message: z.string().max(DISCORD_MESSAGE_LIMIT, {
    message: `Message exceeds Discord's character limit of ${DISCORD_MESSAGE_LIMIT}`
  }),
  options: z.object({
    embed: z.boolean().optional(),
    type: z.enum(Object.keys(QueryMcFlurryColors) as [EmbedType, ...EmbedType[]]).optional()
  }).default({})
});

export async function EditReply(
  source: CommandInteraction | Message,
  emoji: string | undefined,
  message: string,
  options: { embed?: boolean; type?: EmbedType } = {},
): Promise<void> {
  const validatedParams = EditReplySchema.parse({ source, emoji, message, options });

  const content = validatedParams.emoji ? `**\`${validatedParams.emoji}\`** | ${validatedParams.message}` : validatedParams.message;

  const embedColor = validatedParams.options.type
    ? embedColors[validatedParams.options.type]
    : embedColors.default;

  const editOptions: InteractionContent = {
    content: validatedParams.options.embed ? undefined : content,
    embeds: validatedParams.options.embed
      ? [{ description: content, color: embedColor }]
      : undefined,
  };

  try {
    if (source instanceof CommandInteraction) {
      await source.editOriginal(editOptions);
    } else if (source instanceof Message) {
      await source.edit(editOptions);
    } else {
      throw new Error("Invalid source type");
    }
  } catch (error) {
    console.error("Failed to edit reply:", error);
    throw new Error("Failed to edit reply");
  }
}

