import { clsx, type ClassValue } from "clsx";
import { Tasktype } from "convex/types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTaskProgress = (task: Tasktype) => {
  if (task.subtasks.length === 0) return task.completed ? 100 : 0;
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed
  ).length;
  return Math.round((completedSubtasks / task.subtasks.length) * 100);
};

export const formatDate = (daysLeft: number) => {
  return new Date(
    Date.now() + daysLeft * 24 * 60 * 60 * 1000
  ).toLocaleDateString();
};
