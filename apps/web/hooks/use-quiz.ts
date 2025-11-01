import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { Answer, GradeResponse } from "@quizzer/shared";
import { fetchQuiz, submitQuiz } from "@/lib/api/quiz";
import { DEFAULT_API_URL } from "@/lib/constants";
import type { UseQuizOptions, UseQuizReturn, QuizAnswers } from "@/types";

export function useQuiz({
  apiUrl = DEFAULT_API_URL,
}: UseQuizOptions = {}): UseQuizReturn {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<GradeResponse | null>(null);

  const {
    data: questions = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["quiz", apiUrl],
    queryFn: () => fetchQuiz(apiUrl),
  });

  const {
    mutateAsync: submitQuizMutation,
    isPending: isSubmitting,
    error: mutationError,
  } = useMutation({
    mutationFn: async (formattedAnswers: Answer[]) => {
      return submitQuiz(formattedAnswers, apiUrl);
    },
    onSuccess: (data: GradeResponse) => {
      setResults(data);
    },
  });

  // Handle answer changes for text and radio
  const setAnswer = useCallback(
    (questionId: string | number, value: string | number) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    },
    []
  );

  // Handle checkbox changes
  const setCheckboxAnswer = useCallback(
    (questionId: string | number, index: number, checked: boolean) => {
      setAnswers((prev) => {
        const current = (prev[questionId] as number[]) || [];
        if (checked) {
          return { ...prev, [questionId]: [...current, index] };
        } else {
          return {
            ...prev,
            [questionId]: current.filter((i) => i !== index),
          };
        }
      });
    },
    []
  );

  // Submit quiz for grading
  const handleSubmitQuiz = useCallback(async () => {
    // Convert answers to the format expected by the API
    const formattedAnswers: Answer[] = Object.entries(answers).map(
      ([id, value]) => ({
        id: isNaN(Number(id)) ? id : Number(id),
        value,
      })
    );

    await submitQuizMutation(formattedAnswers);
  }, [answers, submitQuizMutation]);

  const resetQuiz = useCallback(() => {
    setAnswers({});
    setResults(null);
  }, []);

  const error = (queryError || mutationError) as Error | null;

  return {
    questions,
    answers,
    isLoading,
    error: error ? error : null,
    isSubmitting,
    results,
    setAnswer,
    setCheckboxAnswer,
    submitQuiz: handleSubmitQuiz,
    resetQuiz,
  };
}
