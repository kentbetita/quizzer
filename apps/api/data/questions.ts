import type { Question } from "@quizzer/shared";

export const mockQuestions: Question[] = [
  {
    id: 1,
    type: "radio",
    question: "What is the capital of France?",
    choices: ["London", "Berlin", "Paris", "Madrid"],
    correctIndex: 2,
  },
  {
    id: 2,
    type: "checkbox",
    question: "Which of the following are programming languages?",
    choices: ["JavaScript", "HTML", "Python", "CSS"],
    correctIndexes: [0, 2],
  },
  {
    id: 3,
    type: "text",
    question: "What is 2 + 2?",
    correctText: "4",
  },
  {
    id: 4,
    type: "radio",
    question: "Which HTTP method is used for creating resources?",
    choices: ["GET", "POST", "PUT", "DELETE"],
    correctIndex: 1,
  },
  {
    id: 5,
    type: "checkbox",
    question: "Which of these are JavaScript frameworks?",
    choices: ["React", "Vue", "Angular", "Django"],
    correctIndexes: [0, 1, 2],
  },
  {
    id: 6,
    type: "text",
    question: "What does API stand for?",
    correctText: "Application Programming Interface",
  },
  {
    id: 7,
    type: "radio",
    question: "What is the main purpose of TypeScript?",
    choices: [
      "To make JavaScript faster",
      "To add static typing to JavaScript",
      "To replace JavaScript",
      "To style web pages",
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    type: "checkbox",
    question: "Which are valid React hooks?",
    choices: ["useState", "useEffect", "useComponent", "useContext"],
    correctIndexes: [0, 1, 3],
  },
  {
    id: 9,
    type: "text",
    question: "What is the square root of 16?",
    correctText: "4",
  },
  {
    id: 10,
    type: "radio",
    question: "What is the default port for HTTP?",
    choices: ["80", "443", "8080", "3000"],
    correctIndex: 0,
  },
];
