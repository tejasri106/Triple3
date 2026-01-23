import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js";
import { getRandomTrivia } from "../helpers/trivia.js";

export default {
  data: new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("Get a random trivia question"),

  async execute(interaction) {
    const trivia = getRandomTrivia();

    // Create buttons for each answer option
    const buttons = trivia.options.map((option, index) =>
      new ButtonBuilder()
        .setCustomId(`trivia_${index}`)
        .setLabel(option)
        .setStyle(ButtonStyle.Primary)
    );

    const row = new ActionRowBuilder().addComponents(buttons);

    // Create the embed with the question
    const embed = new EmbedBuilder()
      .setTitle("Trivia Question")
      .setDescription(trivia.question)
      .setColor(0x0099ff);

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });

    // Collector to handle button clicks
    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000, // 60 seconds
    });

    collector.on("collect", async (i) => {
      const selectedIndex = parseInt(i.customId.split("_")[1]);

      if (selectedIndex === trivia.correctIndex) {
        await i.reply({
          content: "✅ **Correct!**",
          ephemeral: true,
        });
      } else {
        await i.reply({
          content: `❌ **Incorrect!** The correct answer was: **${trivia.options[trivia.correctIndex]}**`,
          ephemeral: true,
        });
      }

      collector.stop();
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        interaction.editReply({
          components: [], // Remove buttons after timeout
        });
      }
    });
  },
};
