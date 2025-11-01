import { Hono } from "hono";
import { getQuiz, gradeQuiz } from "../services/quiz-service";
import { API_ENDPOINTS, ERROR_MESSAGES } from "../lib/constants";

const quizRouter = new Hono();

quizRouter.get(API_ENDPOINTS.QUIZ, async (c) => {
  try {
    const quizData = getQuiz();
    return c.json(quizData);
  } catch (error) {
    return c.json(
      {
        error:
          error instanceof Error
            ? error.message
            : ERROR_MESSAGES.FETCH_QUIZ_FAILED,
      },
      500
    );
  }
});

quizRouter.post(API_ENDPOINTS.GRADE, async (c) => {
  try {
    const body = await c.req.json();
    const response = gradeQuiz(body.answers);

    return c.json(response);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.INVALID_PAYLOAD
    ) {
      return c.json(
        {
          error: ERROR_MESSAGES.INVALID_PAYLOAD,
          details: "Please check your answer format",
        },
        400
      );
    }

    return c.json(
      {
        error:
          error instanceof Error
            ? error.message
            : ERROR_MESSAGES.GRADE_QUIZ_FAILED,
      },
      500
    );
  }
});

export { quizRouter };
