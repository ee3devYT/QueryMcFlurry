import { z } from 'zod'

const envSchema = z.object({
    DISCORD_AUTH_TOKEN: z.string(),
    PRIVATE_COMMAND_USER_IDS: z.string().transform((ids) => ids.split(',')),
    PRIVATE_GUILDS: z.string().transform((ids) => ids.split(',')),
    DATABASE_URL: z.string()
})

envSchema.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Omit<z.infer<typeof envSchema>, 'PRIVATE_COMMAND_USER_IDS' | 'PRIVATE_GUILDS'> {
            PRIVATE_COMMAND_USER_IDS: string;
            PRIVATE_GUILDS: string;
        }
    }
}
