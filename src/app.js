// // import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
// // import { loadEvents } from "./helpers/index.js";
// // import path from "path";
// // import { loadCommands } from "./helpers/loadCommands.js";



// // const TOKEN = process.env.TOKEN;

// // const { Guilds, GuildMembers, GuildMessages, MessageContent } =
// //   GatewayIntentBits;
// // const { User, Message, GuildMember, ThreadMember } = Partials;

// // const client = new Client({
// //   intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
// //   partials: [User, Message, GuildMember, ThreadMember],
// // });

// // client.events = new Collection();

// // loadEvents(client, path.join(__dirname, "events"));

// // client.commands = new Collection();
// // loadCommands(client, path.join(__dirname, "commands"));


// // client.login(TOKEN);

// import "dotenv/config";
// import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
// import { loadEvents } from "./helpers/index.js";
// import { loadCommands } from "./helpers/loadCommands.js";
// import path from "path";
// import { fileURLToPath } from "url";

// // Fix __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const TOKEN = process.env.TOKEN;

// const { Guilds, GuildMembers, GuildMessages, MessageContent } =
//   GatewayIntentBits;
// const { User, Message, GuildMember, ThreadMember } = Partials;

// const client = new Client({
//   intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
//   partials: [User, Message, GuildMember, ThreadMember],
// });

// client.events = new Collection();
// loadEvents(client, path.join(__dirname, "events"));

// client.commands = new Collection();
// loadCommands(client, path.join(__dirname, "commands"));

// client.login(TOKEN);

import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

// Import events directly
import interactionCreate from "./events/interactionCreate.js";
import messageCreate from "./events/messageCreate.js";
import ready from "./events/ready.js";

// Import commands directly
import trivia from "./commands/trivia.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Command registry (simple)
client.commands = new Map();
client.commands.set(trivia.data.name, trivia);

// Events
client.once("ready", (...args) => ready.execute(...args));
client.on("interactionCreate", (interaction) =>
  interactionCreate.execute(interaction)
);
client.on("messageCreate", (message) =>
  messageCreate.execute(message)
);

client.login(process.env.TOKEN);
