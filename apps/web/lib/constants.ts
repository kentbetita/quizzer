/**
 * Application constants
 */

export const API_ENDPOINTS = {
  QUIZ: "/api/quiz",
  GRADE: "/api/grade",
} as const;

export const DEFAULT_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export const ERROR_MESSAGES = {
  DEFAULT: "An error occurred",
  FETCH_QUIZ_FAILED: "Failed to fetch quiz",
  GRADE_QUIZ_FAILED: "Failed to grade quiz",
  INVALID_QUIZ_DATA: "Invalid quiz data received from server",
  INVALID_GRADE_RESPONSE: "Invalid grade response received from server",
  INVALID_ANSWER_FORMAT: "Invalid answer format",
  INVALID_PAYLOAD: "Invalid payload",
} as const;
