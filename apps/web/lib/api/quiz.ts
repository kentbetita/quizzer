import type { Question, Answer, GradeResponse } from "@quizzer/shared";
import {
  QuizSchema,
  GradeResponseSchema,
  GradeRequestSchema,
} from "@quizzer/shared";
import {
  DEFAULT_API_URL,
  API_ENDPOINTS,
  ERROR_MESSAGES,
} from "@/lib/constants";

export async function fetchQuiz(
  apiUrl: string = DEFAULT_API_URL
): Promise<Question[]> {
  const response = await fetch(`${apiUrl}${API_ENDPOINTS.QUIZ}`);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_QUIZ_FAILED);
  }

  const data = await response.json();

  const validationResult = QuizSchema.safeParse(data);

  if (!validationResult.success) {
    console.error("Quiz response validation failed:", validationResult.error);
    throw new Error(ERROR_MESSAGES.INVALID_QUIZ_DATA);
  }

  return validationResult.data.questions;
}

export async function submitQuiz(
  answers: Answer[],
  apiUrl: string = DEFAULT_API_URL
): Promise<GradeResponse> {
  const requestPayload = { answers };
  const requestValidation = GradeRequestSchema.safeParse(requestPayload);

  if (!requestValidation.success) {
    console.error("Request validation failed:", requestValidation.error);
    throw new Error(ERROR_MESSAGES.INVALID_ANSWER_FORMAT);
  }

  const response = await fetch(`${apiUrl}${API_ENDPOINTS.GRADE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || ERROR_MESSAGES.GRADE_QUIZ_FAILED);
  }

  const data = await response.json();

  const responseValidation = GradeResponseSchema.safeParse(data);

  if (!responseValidation.success) {
    console.error(
      "Grade response validation failed:",
      responseValidation.error
    );
    throw new Error(ERROR_MESSAGES.INVALID_GRADE_RESPONSE);
  }

  return responseValidation.data;
}
