/**
 * Application constants
 */

export const API_ENDPOINTS = {
  QUIZ: "/api/quiz",
  GRADE: "/api/grade",
} as const;

export const CORS_ORIGINS = {
  LOCAL_DEV: "http://localhost:3000",
} as const;

export const ERROR_MESSAGES = {
  INVALID_QUIZ_DATA: "Invalid quiz data structure",
  INVALID_PAYLOAD: "Invalid payload",
  INVALID_RESPONSE: "Invalid response structure",
  FETCH_QUIZ_FAILED: "Failed to fetch quiz",
  GRADE_QUIZ_FAILED: "Failed to grade quiz",
} as const;
