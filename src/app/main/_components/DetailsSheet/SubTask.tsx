"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { SubTaskType } from "convex/types";
import { Trash2 } from "lucide-react";

type SubTaskProps = {
  subtask: SubTaskType;
  parentTaskId: Id<"tasks">;
};
export const SubTask = ({ subtask, parentTaskId }: SubTaskProps) => {
  const toggleSubTaskHandle = useMutation(api.tasks.toggleSubtask);
  const deleteSubTaskHandle = useMutation(api.tasks.deleteSubTask);

  const handleToggle = () => {
    toggleSubTaskHandle({
      taskId: parentTaskId,
      subtaskId: subtask.id,
    });
  };

  const handleDelete = () => {
    deleteSubTaskHandle({
      taskId: parentTaskId,
      subtaskId: subtask.id,
    });
  };

  return (
    <div key={subtask.id} className="flex justify-between">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={subtask.completed}
          onCheckedChange={handleToggle}
          className="h-4 w-4"
        />
        <span
          className={`text-sm ${
            subtask.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {subtask.title}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
        onClick={handleDelete}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default SubTask;
