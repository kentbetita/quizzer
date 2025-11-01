import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { QuestionResultProps } from "@/types";

export function QuestionResult({
  question,
  questionIndex,
  userAnswer,
  isCorrect,
}: QuestionResultProps) {
  return (
    <Card
      className={cn(
        isCorrect
          ? "border-green-500 bg-green-50 dark:bg-green-950/20"
          : "border-red-500 bg-red-50 dark:bg-red-950/20"
      )}
    >
      <CardContent className="pt-6">
        <div className="mb-2 flex items-start gap-2">
          <span className="font-semibold">Q{questionIndex + 1}.</span>
          <span className="font-medium">{question.question}</span>
          {isCorrect ? (
            <span className="ml-auto text-green-600 dark:text-green-400">
              ✓ Correct
            </span>
          ) : (
            <span className="ml-auto text-red-600 dark:text-red-400">
              ✗ Incorrect
            </span>
          )}
        </div>

        {question.type === "text" && (
          <div className="ml-6 mt-2">
            <div className="text-sm text-muted-foreground">
              Your answer: {userAnswer || "(no answer)"}
            </div>
            {!isCorrect && (
              <div className="text-sm text-green-600 dark:text-green-400">
                Correct answer: {question.correctText}
              </div>
            )}
          </div>
        )}

        {question.type === "radio" && (
          <div className="ml-6 mt-2">
            <div className="text-sm text-muted-foreground">
              Your answer:{" "}
              {typeof userAnswer === "number"
                ? question.choices[userAnswer]
                : "(no answer)"}
            </div>
            {!isCorrect && (
              <div className="text-sm text-green-600 dark:text-green-400">
                Correct answer: {question.choices[question.correctIndex]}
              </div>
            )}
          </div>
        )}

        {question.type === "checkbox" && (
          <div className="ml-6 mt-2">
            <div className="text-sm text-muted-foreground">
              Your answers:{" "}
              {Array.isArray(userAnswer) && userAnswer.length > 0
                ? userAnswer
                    .map((idx: number) => question.choices[idx])
                    .join(", ")
                : "(no answers)"}
            </div>
            {!isCorrect && (
              <div className="text-sm text-green-600 dark:text-green-400">
                Correct answers:{" "}
                {question.correctIndexes
                  .map((idx) => question.choices[idx])
                  .join(", ")}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
