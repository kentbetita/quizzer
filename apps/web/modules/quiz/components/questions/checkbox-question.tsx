import { Checkbox } from "@/components/ui/checkbox";
import type { CheckboxQuestionProps } from "@/types";

export function CheckboxQuestion({
  choices,
  selectedIndexes,
  onChange,
  questionId,
}: CheckboxQuestionProps) {
  return (
    <div className="space-y-3">
      {choices.map((choice, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 rounded-md p-2 hover:bg-accent"
        >
          <Checkbox
            id={`checkbox-${questionId}-${index}`}
            checked={selectedIndexes.includes(index)}
            onCheckedChange={(checked) => onChange(index, checked === true)}
          />
          <label
            htmlFor={`checkbox-${questionId}-${index}`}
            className="flex-1 cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {choice}
          </label>
        </div>
      ))}
    </div>
  );
}
