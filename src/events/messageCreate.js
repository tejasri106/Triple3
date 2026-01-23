export default {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    const answer = message.client.currentTriviaAnswer;
    if (!answer) return;

    const userAnswer = message.content.trim().toLowerCase();

    if (userAnswer === answer) {
      await message.reply("✅ Correct!");
    } else {
      await message.reply(
        `❌ Incorrect. The correct answer was **${answer}**.`
      );
    }

    // 🔑 clear state after answering
    message.client.currentTriviaAnswer = null;
  },
};
