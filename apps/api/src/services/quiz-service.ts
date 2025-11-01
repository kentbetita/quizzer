import type { GradeResponse } from "@quizzer/shared";
import {
  QuizSchema,
  GradeRequestSchema,
  GradeResponseSchema,
} from "@quizzer/shared";
import { mockQuestions } from "../../data/questions";
import { gradeAnswers, calculateScore } from "../utils/grading";
import { ERROR_MESSAGES } from "../lib/constants";

export function getQuiz() {
  const quizData = { questions: mockQuestions };
  const validation = QuizSchema.safeParse(quizData);

  if (!validation.success) {
    throw new Error(ERROR_MESSAGES.INVALID_QUIZ_DATA);
  }

  return validation.data;
}

export function gradeQuiz(
  answers: Array<{ id: string | number; value: any }>
): GradeResponse {
  const requestValidation = GradeRequestSchema.safeParse({ answers });

  if (!requestValidation.success) {
    throw new Error(ERROR_MESSAGES.INVALID_PAYLOAD);
  }

  const results = gradeAnswers(mockQuestions, requestValidation.data.answers);
  const score = calculateScore(results);

  const response: GradeResponse = {
    score,
    total: mockQuestions.length,
    results,
  };

  const responseValidation = GradeResponseSchema.safeParse(response);
  if (!responseValidation.success) {
    throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
  }

  return responseValidation.data;
}
