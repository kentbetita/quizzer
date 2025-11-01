import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextQuestion } from "./questions/text-question";
import { RadioQuestion } from "./questions/radio-question";
import { CheckboxQuestion } from "./questions/checkbox-question";
import type { QuestionCardProps } from "@/types";

export function QuestionCard({
  question,
  questionIndex,
  answer,
  onAnswerChange,
  onCheckboxChange,
}: QuestionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Q{questionIndex + 1}. {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {question.type === "text" && (
          <TextQuestion
            value={typeof answer === "string" ? answer : ""}
            onChange={(value) => onAnswerChange(value)}
          />
        )}

        {question.type === "radio" && (
          <RadioQuestion
            choices={question.choices}
            value={typeof answer === "number" ? answer : undefined}
            onChange={onAnswerChange}
            questionId={question.id}
          />
        )}

        {question.type === "checkbox" && (
          <CheckboxQuestion
            choices={question.choices}
            selectedIndexes={Array.isArray(answer) ? answer : []}
            onChange={onCheckboxChange}
            questionId={question.id}
          />
        )}
      </CardContent>
    </Card>
  );
}
