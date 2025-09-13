import { Tasktype } from "convex/types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Tasktype[];
  onSelectTaskId: (taskId: Tasktype["_id"]) => void;
  title: string;
}

export const TaskList = ({ tasks, onSelectTaskId, title }: TaskListProps) => {
  return (
    <article className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-sm font-medium  uppercase tracking-wide">
          {title}
        </h2>
        <span className="bg-muted-foreground text-white  text-xs px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            task={task}
            key={task._id}
            onSelectTaskId={onSelectTaskId}
          />
        ))}
      </div>
    </article>
  );
};

export default TaskList;
