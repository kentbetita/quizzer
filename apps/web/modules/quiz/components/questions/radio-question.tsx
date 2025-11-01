import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { RadioQuestionProps } from "@/types";

export function RadioQuestion({
  choices,
  value,
  onChange,
  questionId,
}: RadioQuestionProps) {
  const handleValueChange = (val: string) => {
    const numValue = Number(val);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  return (
    <RadioGroup
      value={value !== undefined ? String(value) : undefined}
      onValueChange={handleValueChange}
    >
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 rounded-md p-2 hover:bg-accent"
          >
            <RadioGroupItem
              value={String(index)}
              id={`radio-${questionId}-${index}`}
            />
            <label
              htmlFor={`radio-${questionId}-${index}`}
              className="flex-1 cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {choice}
            </label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
