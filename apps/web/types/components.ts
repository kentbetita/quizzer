import type { Question, GradeResponse } from "@quizzer/shared";
import type { QuizAnswers } from "./quiz";

export interface QuizProps {
  apiUrl?: string;
}

export interface QuizFormProps {
  questions: Question[];
  answers: QuizAnswers;
  error: string | null;
  submitting: boolean;
  onAnswerChange: (questionId: string | number, value: string | number) => void;
  onCheckboxChange: (
    questionId: string | number,
    index: number,
    checked: boolean
  ) => void;
  onSubmit: () => void;
}

export interface QuizResultsProps {
  questions: Question[];
  results: GradeResponse;
  answers: QuizAnswers;
  onReset: () => void;
}

export interface QuizErrorProps {
  error: string;
  onRetry?: () => void;
}

export interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  answer: string | number | number[] | undefined;
  onAnswerChange: (value: string | number) => void;
  onCheckboxChange: (index: number, checked: boolean) => void;
}

export interface QuestionResultProps {
  question: Question;
  questionIndex: number;
  userAnswer: string | number | number[] | undefined;
  isCorrect: boolean;
}

export interface TextQuestionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface RadioQuestionProps {
  choices: string[];
  value?: number;
  onChange: (index: number) => void;
  questionId: string | number;
}

export interface CheckboxQuestionProps {
  choices: string[];
  selectedIndexes: number[];
  onChange: (index: number, checked: boolean) => void;
  questionId: string | number;
}
