"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

import { Tasktype } from "../../../convex/types";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

type TaskItemProps = {
  task: Tasktype;
  onSelectTaskId: (taskId: Tasktype["_id"]) => void;
};

export const TaskItem = ({ task, onSelectTaskId }: TaskItemProps) => {
  const markAsDoneRequest = useMutation(api.tasks.markAsComplete);
  const deleteTaskRequest = useMutation(api.tasks.deleteTask);

  const handleMark = () => {
    markAsDoneRequest({
      id: task._id,
    });
  };
  const handleDeleteTask = () => {
    deleteTaskRequest({ id: task._id });
  };
  return (
    <Card className="p-4 bg-white shadow-sm hover:shadow-md ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleMark}
            className=" cursor-pointer "
          />
          <div className="flex-1">
            <h3
              className="font-medium hover:underline  cursor-pointer"
              onClick={() => onSelectTaskId(task._id)}
            >
              {task.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge priority={task.priority} variant="outline">
            {task.priority}
          </Badge>
          <Button
            variant="destructive-hover"
            size="icon"
            onClick={handleDeleteTask}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
