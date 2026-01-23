// export default {
//   name: "messageCreate",
//   async execute(message) {
//     if (message.author.bot) return;

//     const answer = message.client.currentTriviaAnswer;
//     if (!answer) return;

//     const userAnswer = message.content.trim().toLowerCase();

//     if (userAnswer === answer) {
//       await message.reply("✅ Correct!");
//     } else {
//       await message.reply(
//         `❌ Incorrect. The correct answer was **${answer}**.`
//       );
//     }

//     // 🔑 clear state after answering
//     message.client.currentTriviaAnswer = null;
//   },
// };

export default {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    const correctAnswer = message.client.currentTriviaAnswer;
    if (!correctAnswer) return;

    const userAnswer = message.content
      .trim()
      .toLowerCase();

    const normalizedCorrect = correctAnswer
      .trim()
      .toLowerCase();

    console.log("USER:", JSON.stringify(userAnswer));
    console.log("CORRECT:", JSON.stringify(normalizedCorrect));

    if (userAnswer === normalizedCorrect) {
      await message.reply("✅ Correct!");
    } else {
      await message.reply(
        `❌ Incorrect. The correct answer was ${correctAnswer}.`
      );
    }

    message.client.currentTriviaAnswer = null;
  },
};
