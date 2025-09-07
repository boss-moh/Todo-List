"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  daysLeft: number;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

type TaskItemProps = {
  task: Task;
  onSelectTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  showTaskDetails?: (task: Task) => void;
};

export const TaskItem = ({
  task,
  toggleTask,
  deleteTask,
  onSelectTask = () => {},
}: TaskItemProps) => {
  return (
    <Card
      key={task.id}
      className="p-4 bg-white shadow-sm hover:shadow-md cursor-pointer"
      onClick={() => onSelectTask(task)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTask(task.id)}
            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
          />
          <div className="flex-1">
            <h3 className="font-medium ">{task.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge priority={task.priority} variant="outline">
            {task.priority}
          </Badge>
          <Button
            variant="destructive-hover"
            size="icon"
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
