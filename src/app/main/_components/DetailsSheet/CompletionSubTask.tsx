"use client";

import { Button } from "@/components/ui/button";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";

type CompletionSubTaskProps = {
  parentId: Id<"tasks">;
  subtaskId: string;
  isCompleted: boolean;
};

export const CompletionSubTask = ({
  parentId,
  isCompleted,
  subtaskId,
}: CompletionSubTaskProps) => {
  const handleToggleCompletion = useMutation(api.tasks.toggleSubtask);

  const handle = () => {
    handleToggleCompletion({ taskId: parentId, subtaskId });
  };

  return (
    <Button className="flex-1" onClick={handle}>
      {isCompleted ? "Mark as incomplete" : "Mark as Complete"}
    </Button>
  );
};

export default CompletionSubTask;
