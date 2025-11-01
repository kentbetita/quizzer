import { Input } from "@/components/ui/input";
import type { TextQuestionProps } from "@/types";

export function TextQuestion({
  value,
  onChange,
  placeholder = "Type your answer here...",
}: TextQuestionProps) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
