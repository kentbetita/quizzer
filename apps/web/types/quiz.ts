import type { Question, GradeResponse } from "@quizzer/shared";

export type QuizAnswers = Record<string | number, string | number | number[]>;

export interface UseQuizOptions {
  apiUrl?: string;
}

export interface UseQuizReturn {
  questions: Question[];
  answers: QuizAnswers;
  isLoading: boolean;
  error: Error | null;
  isSubmitting: boolean;
  results: GradeResponse | null;
  setAnswer: (questionId: string | number, value: string | number) => void;
  setCheckboxAnswer: (
    questionId: string | number,
    index: number,
    checked: boolean
  ) => void;
  submitQuiz: () => Promise<void>;
  resetQuiz: () => void;
}
