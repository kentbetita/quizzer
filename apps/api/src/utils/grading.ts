import type { Question, Answer, GradeResult } from "@quizzer/shared";

export function gradeAnswer(
  question: Question,
  answer: Answer
): { correct: boolean } {
  if (question.type === "text") {
    const userAnswer = String(answer.value).trim().toLowerCase();
    const correctAnswer = question.correctText.trim().toLowerCase();
    return { correct: userAnswer === correctAnswer };
  }

  if (question.type === "radio") {
    return { correct: answer.value === question.correctIndex };
  }

  if (question.type === "checkbox") {
    const userIndexes = Array.isArray(answer.value)
      ? [...answer.value].sort((a, b) => a - b)
      : [];
    const correctIndexes = [...question.correctIndexes].sort((a, b) => a - b);

    return {
      correct:
        userIndexes.length === correctIndexes.length &&
        userIndexes.every((val, idx) => val === correctIndexes[idx]),
    };
  }

  return { correct: false };
}

export function gradeAnswers(
  questions: Question[],
  answers: Answer[]
): GradeResult[] {
  return answers.map((answer) => {
    const question = questions.find((q) => q.id === answer.id);

    if (!question) {
      return { id: answer.id, correct: false };
    }

    const { correct } = gradeAnswer(question, answer);
    return { id: answer.id, correct };
  });
}

export function calculateScore(results: GradeResult[]): number {
  return results.filter((result) => result.correct).length;
}
