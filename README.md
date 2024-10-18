<div align="center">
  <img src="https://cdn.discordapp.com/attachments/1271898793570472006/1296437155631202354/QueryMcFlurryIcon.png?ex=6712f170&is=67119ff0&hm=7ab54e7273ff50ed685f82f414310d998c6ef89f727b978e7244963bbf262745&" width="200" alt="QueryMcFlurry Icon" />
  <h1>QueryMcFlurry</h1>
  
  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)
  [![Discord](https://img.shields.io/discord/YOUR_DISCORD_SERVER_ID.svg?color=7289DA&label=Join%20Our%20Discord&logo=discord&style=flat-square)](https://discord.gg/YOUR_INVITE_LINK)

  <p><strong>QueryMcFlurry</strong> is a powerful, multi-functional, open-source Discord bot designed to enhance your server management experience.</p>
</div>

## 🌟 Features

- 🛡️ Advanced moderation tools
- 📊 Server analytics and reporting
- 🎉 Fun commands and mini-games
- 🔧 Customizable settings
- 🌐 Multi-language support
- 🔒 Robust permission system

## 🛠 Tech Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge) 
![Bun](https://img.shields.io/badge/Bun-FFFFFF?logo=bun&logoColor=black&style=for-the-badge)
![Oceanic.js](https://img.shields.io/badge/Oceanic.js-007ACC?logo=discord&logoColor=white&style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-3C3C3D?logo=zod&logoColor=white&style=for-the-badge)

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [How to Create Events](#-how-to-create-events)
- [How to Create Commands](#-how-to-create-commands)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (1.1.30 or higher)
- [Discord Bot Token](https://discord.com/developers/applications)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ee3devYT/QueryMcFlurry.git
   cd QueryMcFlurry
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your Discord bot token and other required information.

4. Generate Prisma Client:
   ```bash
   bun prisma generate
   bun prisma push
   ```

5. Start the bot:
   ```bash
   bun start
   ```

## 🎊 How to Create Events

Events allow your bot to react to Discord events. To create a new event:

1. Create a new file in the `src/events` directory.
2. Use the following template:

```typescript
import { Event, QueryMcFlurry } from "@base/classes";

export default class Ready extends Event<'ready'> {
  constructor(client: QueryMcFlurry) {
    super(client, {
      name: 'ready',
      description: 'Triggered when the bot is ready',
      listen: 'once', // 'once' or 'always'
    });
  }

  async execute() {
    console.log(`${this.client.user.username} is ready!`);
  }
}
```

### Event Options

| Option        | Type     | Description                                   |
|---------------|----------|-----------------------------------------------|
| `name`        | `string` | The name of the event.                        |
| `description` | `string` | A brief description of the event's purpose.   |
| `listen`      | `string` | 'once' (trigger once) or 'always' (on client.on()) |

## 📝 How to Create Commands

Commands are the primary way users interact with your bot. To create a new command:

1. Create a new file in the `src/commands` directory.
2. Use the following template:

```typescript
import { Command, QueryMcFlurry } from "@base/classes";
import { Category } from "@base/enums";
import { Reply } from "@helpers";
import type { CommandInteraction } from "oceanic.js";

export default class Ping extends Command {
    constructor(client: QueryMcFlurry) {
        super(client, {
            name: "ping",
            description: "Check the bot's latency",
            category: Category.Information,
            options: [],
            default_member_permissions: 0n,
            dm_permission: true,
            visibility: "public",
            cooldown: {
                type: "user",
                duration: 60000
            }
        });
    }
    
    execute(interaction: CommandInteraction): void {
        Reply(interaction, "🏓", "Pong!", false, { embed: true, type: "success" });
    }
}
```

### Command Options

| Option                      | Type              | Description                                                    |
|-----------------------------|-------------------|----------------------------------------------------------------|
| `name`                      | `string`          | The command name users will type.                              |
| `description`               | `string`          | A brief description of the command's function.                 |
| `category`                  | `Category` (enum) | The category the command belongs to.                           |
| `options`                   | `Array`           | Command arguments and options.                                 |
| `default_member_permissions`| `bigint`          | Required permissions (0n for no specific permissions).         |
| `dm_permission`             | `boolean`         | Whether the command can be used in DMs.                        |
| `visibility`                | `string`          | 'public' or 'private' (for specific servers).                  |
| `cooldown`                  | `object`          | Cooldown settings to prevent spam.                             |

## ⚙ Configuration

Configure your bot by editing the `.env` file:

```env
# Discord Configuration
DISCORD_AUTH_TOKEN=your_bot_token_here
PRIVATE_COMMAND_USER_IDS=comma,separated,user,ids
PRIVATE_GUILDS=comma,separated,guild,ids

# Database Configuration
DATABASE_URL=your_database_url_here
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 🆘 Support

If you need help or have any questions:

- Join our [Discord server](https://discord.gg/YOUR_INVITE_LINK)
- Open an [issue](https://github.com/yourusername/QueryMcFlurry/issues)

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by the QueryMcFlurry team</p>
  <p>© 2024 QueryMcFlurry. All rights reserved.</p>
</div>
