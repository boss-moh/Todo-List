import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Calendar, Clock } from "lucide-react";
import { Task } from "./type";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const getTaskProgress = (task: Task) => {
  if (task.subtasks.length === 0) return task.completed ? 100 : 0;
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed
  ).length;
  return Math.round((completedSubtasks / task.subtasks.length) * 100);
};

interface DetailsSheetProps {
  isOpen: boolean;
  close: () => void;
  selectedTask: Task | null;
  openEditSheet: () => void;
}

export const DetailsSheet = ({
  isOpen,
  close,
  selectedTask,
  openEditSheet,
}: DetailsSheetProps) => {
  const hasSubtasks =
    selectedTask?.subtasks && selectedTask.subtasks.length > 0;

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="w-[400px] sm:w-[540px] p-4">
        <SheetHeader>
          <SheetTitle>Task Details</SheetTitle>
          <SheetDescription>View and manage your task</SheetDescription>
        </SheetHeader>
        {selectedTask && (
          <article className="space-y-6 mt-6">
            <header>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {selectedTask.title}
              </h3>
              <Badge priority={selectedTask.priority}>
                {selectedTask.priority}
              </Badge>
            </header>

            <div>
              <h4 className="font-medium text-foreground mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                {selectedTask.description || "No description provided"}
              </p>
            </div>

            {hasSubtasks && (
              <div>
                <h4 className="font-medium text-foreground mb-2">Subtasks</h4>
                <div className="space-y-2">
                  {selectedTask.subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={subtask.completed}
                        onCheckedChange={() =>
                          toggleSubtask(selectedTask.id, subtask.id)
                        }
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
                  ))}
                </div>
                <div className="mt-3">
                  <Progress
                    value={getTaskProgress(selectedTask)}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedTask.subtasks.filter((s) => s.completed).length} of{" "}
                    {selectedTask.subtasks.length} completed
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{selectedTask.daysLeft} days left</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Due:{" "}
                  {new Date(
                    Date.now() + selectedTask.daysLeft * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-foreground mb-2">Status</h4>
              <p className="text-sm text-muted-foreground">
                {selectedTask.completed ? "Completed" : "In Progress"}
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              {!selectedTask.completed && (
                <Button className="flex-1">Mark as Complete</Button>
              )}
              <Button variant="outline" onClick={openEditSheet}>
                Edit Task
              </Button>
            </div>
          </article>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default DetailsSheet;
