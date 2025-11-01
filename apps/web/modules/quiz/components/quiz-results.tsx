import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionResult } from "./question-result";
import type { QuizResultsProps } from "@/types";

export function QuizResults({
  questions,
  results,
  answers,
  onReset,
}: QuizResultsProps) {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="text-4xl font-bold text-primary">
              {results.score} / {results.total}
            </div>
            <CardDescription className="text-base">
              {Math.round((results.score / results.total) * 100)}% Correct
            </CardDescription>
          </div>

          <div className="space-y-6">
            {questions.map((question, qIdx) => {
              const result = results.results.find((r) => r.id === question.id);
              const userAnswer = answers[question.id];
              const isCorrect = result?.correct ?? false;

              return (
                <QuestionResult
                  key={question.id}
                  question={question}
                  questionIndex={qIdx}
                  userAnswer={userAnswer}
                  isCorrect={isCorrect}
                />
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onReset} variant="outline">
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
