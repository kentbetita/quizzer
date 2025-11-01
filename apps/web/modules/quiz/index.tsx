"use client";

import { useQuiz } from "@/hooks/use-quiz";
import { QuizError } from "./components/quiz-error";
import { QuizForm } from "./components/quiz-form";
import { QuizLoading } from "./components/quiz-loading";
import { QuizResults } from "./components/quiz-results";
import { DEFAULT_API_URL, ERROR_MESSAGES } from "@/lib/constants";
import type { QuizProps } from "@/types";

export function Quiz({ apiUrl = DEFAULT_API_URL }: QuizProps) {
  const {
    questions,
    answers,
    isLoading,
    error,
    isSubmitting,
    results,
    setAnswer,
    setCheckboxAnswer,
    submitQuiz,
    resetQuiz,
  } = useQuiz({ apiUrl });

  if (isLoading) {
    return <QuizLoading />;
  }

  if (error && !questions.length) {
    return (
      <QuizError
        error={error.message || ERROR_MESSAGES.DEFAULT}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (results) {
    return (
      <QuizResults
        questions={questions}
        results={results}
        answers={answers}
        onReset={resetQuiz}
      />
    );
  }

  return (
    <QuizForm
      questions={questions}
      answers={answers}
      error={error?.message || null}
      submitting={isSubmitting}
      onAnswerChange={setAnswer}
      onCheckboxChange={setCheckboxAnswer}
      onSubmit={submitQuiz}
    />
  );
}
