import { SlashCommandBuilder } from "discord.js";
import { getAllergen } from "../helpers/allergen.js";
import { getUserRecipe } from "../state.js";

export default {
  data: new SlashCommandBuilder()
    .setName("allergen")
    .setDescription("Get allergen alternative")
    .addStringOption(option =>
      option
        .setName("name")
        .setDescription("Allergen")
        .setRequired(true)
        .addChoices(
          { name: "Egg", value: "egg" },
          { name: "Dairy", value: "dairy" },
          { name: "Gluten", value: "gluten" },
          { name: "Soy", value: "soy" }
        )
    ),

  async execute(interaction) {
    const allergen = interaction.options.getString("name");
    const recipeNumber = getUserRecipe(interaction.user.id);

    if (!recipeNumber) {
      return interaction.reply({
        content: "❌ Please select a recipe first.",
        ephemeral: true
      });
    }

    const response = await getAllergen(recipeNumber, allergen);

    await interaction.reply({
      content:
        response ?? "Sorry — I don't have a substitution for that allergen yet!"
    });
  },
};