import { Doc, Id } from "./_generated/dataModel";
export type Tasktype = Doc<"tasks">;

// The ID type for a task
export type SubTaskType = Tasktype["subtasks"][0];
