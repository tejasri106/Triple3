import { SlashCommandBuilder } from "discord.js";

const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What planet is known as the Red Planet?", answer: "Mars" },
  { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
];

export default {
  data: new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("Answer a trivia question"),

  async execute(interaction) {
    await interaction.deferReply();

    const trivia =
      triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];

    // 🔑 store answer on the client, not the module
    interaction.client.currentTriviaAnswer = trivia.answer;

    await interaction.editReply(
      `Trivia Question:\n${trivia.question}\n\nType your answer in chat.`
    );
  },
};
