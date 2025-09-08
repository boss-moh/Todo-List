import { z } from "zod";
import { Id } from "../../../convex/_generated/dataModel";

export const addSubtaskSchema = z.object({
  title: z.string().min(1, "Subtask title is required"),
});

export const createTaskFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  // daysLeft: z.coerce.number(),
  priority: z.enum(["high", "medium", "low"]),
  // subtasks: z.array(subtaskSchema).min(1, "At least one subtask required"),
});

export type createTaskFormType = z.infer<typeof createTaskFormSchema>;

export const editTaskFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  // daysLeft: z.coerce.number().min(0, "Days left cannot be negative"),
  priority: z.enum(["high", "medium", "low"]),
});

export type editTaskFormType = z.infer<typeof editTaskFormSchema> & {
  _id: Id<"tasks">;
};

export type addSubtaskType = z.infer<typeof addSubtaskSchema>;
