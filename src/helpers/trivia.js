// helpers/trivia.js

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctIndex: 1,
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correctIndex: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctIndex: 2,
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "Liechtenstein", "Malta"],
    correctIndex: 1,
  },
  {
    question: "In what year did the Titanic sink?",
    options: ["1912", "1920", "1905", "1915"],
    correctIndex: 0,
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctIndex: 2,
  },
  {
    question: "How many strings does a violin have?",
    options: ["4", "5", "6", "8"],
    correctIndex: 0,
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    correctIndex: 1,
  },
];

export const getRandomTrivia = () => {
  const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
  return triviaQuestions[randomIndex];
};
