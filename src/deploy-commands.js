//const { REST, Routes } = require("discord.js");
//const fs = require("fs");
//const path = require("path");

//const commands = [];
//const commandsPath = path.join(__dirname, "commands");
//const files = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

//for (const file of files) {
  //const imported = require(path.join(commandsPath, file));
  //const command = imported.default ?? imported;

  //commands.push(command.data.toJSON());
//}

//const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

//(async () => {
  //await rest.put(
    //Routes.applicationCommands(process.env.CLIENT_ID),
    //{ body: commands }
  //);
  //console.log("Slash commands registered");
//})();

import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const files = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of files) {
  const { default: command } = await import(
    path.join(commandsPath, file)
  );

  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );
  console.log("✅ Slash commands registered");
} catch (error) {
  console.error("Failed to register commands:", error);
}
