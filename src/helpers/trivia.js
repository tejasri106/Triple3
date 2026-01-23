// helpers/trivia.js

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "What planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci",
  },
];

export const getRandomTrivia = () => {
  const index = Math.floor(Math.random() * triviaQuestions.length);
  return triviaQuestions[index];
};
