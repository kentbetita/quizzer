import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./question-card";
import type { QuizFormProps } from "@/types";

export function QuizForm({
  questions,
  answers,
  error,
  submitting,
  onAnswerChange,
  onCheckboxChange,
  onSubmit,
}: QuizFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Quiz</CardTitle>
          <CardDescription>
            Answer all {questions.length} questions below.
          </CardDescription>
        </CardHeader>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, qIdx) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionIndex={qIdx}
            answer={answers[question.id]}
            onAnswerChange={(value) => onAnswerChange(question.id, value)}
            onCheckboxChange={(index, checked) =>
              onCheckboxChange(question.id, index, checked)
            }
          />
        ))}

        <Card>
          <CardFooter className="justify-end">
            <Button
              type="submit"
              disabled={submitting || Object.keys(answers).length === 0}
              className="min-w-32"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
