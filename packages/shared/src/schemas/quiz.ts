import { z } from "zod";

const BaseQuestionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  type: z.enum(["text", "checkbox", "radio"]),
  question: z.string(),
});

const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("text"),
  correctText: z.string(),
});

const RadioQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("radio"),
  choices: z.array(z.string()),
  correctIndex: z.number(),
});

const CheckboxQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("checkbox"),
  choices: z.array(z.string()),
  correctIndexes: z.array(z.number()),
});

export const QuestionSchema = z.discriminatedUnion("type", [
  TextQuestionSchema,
  RadioQuestionSchema,
  CheckboxQuestionSchema,
]);

export type Question = z.infer<typeof QuestionSchema>;

export const QuizSchema = z.object({
  questions: z.array(QuestionSchema),
});

export type Quiz = z.infer<typeof QuizSchema>;

export const AnswerSchema = z.object({
  id: z.union([z.string(), z.number()]),
  value: z.union([z.string(), z.number(), z.array(z.number())]),
});

export type Answer = z.infer<typeof AnswerSchema>;

export const GradeRequestSchema = z.object({
  answers: z.array(AnswerSchema),
});

export const GradeResultSchema = z.object({
  id: z.union([z.string(), z.number()]),
  correct: z.boolean(),
});

export const GradeResponseSchema = z.object({
  score: z.number(),
  total: z.number(),
  results: z.array(GradeResultSchema),
});

export type GradeResult = z.infer<typeof GradeResultSchema>;
export type GradeResponse = z.infer<typeof GradeResponseSchema>;
