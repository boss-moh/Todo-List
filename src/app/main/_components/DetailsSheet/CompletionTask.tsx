"use client";

import { Button } from "@/components/ui/button";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";

type CompletionTaskProps = {
  taskId: Id<"tasks">;
  isCompleted: boolean;
};

export const CompletionTask = ({
  taskId,
  isCompleted,
}: CompletionTaskProps) => {
  const handleToggleCompletion = useMutation(api.tasks.toggleTaskCompletion);

  const handle = () => {
    handleToggleCompletion({ id: taskId });
  };

  return (
    <Button
      variant={!isCompleted ? "default" : "outline"}
      className="flex-1"
      onClick={handle}
    >
      {isCompleted ? "Mark as un complete" : "Mark as Complete"}
    </Button>
  );
};

export default CompletionTask;
