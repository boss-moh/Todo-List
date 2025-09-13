import { Calendar, Clock } from "lucide-react";
import { Tasktype } from "convex/types";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import SubTask from "./SubTask";
import AddSubTask from "./AddSubTask";
import { CompletionSubTask } from "./CompletionSubTask";
import { formatDate, getTaskProgress } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DetailsSheetProps {
  isOpen: boolean;
  close: () => void;
  selectedTask: Tasktype | null;
  openEditSheet: () => void;
}

export const DetailsSheet = ({
  isOpen,
  close,
  selectedTask,
  openEditSheet,
}: DetailsSheetProps) => {
  const hasSubtasks = selectedTask ? selectedTask.subtasks.length !== 0 : false;

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
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
              <section>
                <h4 className="font-medium text-foreground mb-2">Subtasks</h4>
                <div className="space-y-2">
                  {selectedTask.subtasks.map((subtask) => (
                    <SubTask
                      subtask={subtask}
                      parentTaskId={selectedTask._id}
                      key={subtask.id}
                    />
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
              </section>
            )}
            <AddSubTask parentTaskId={selectedTask._id} />

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{selectedTask.daysLeft} days left</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Due: {formatDate(selectedTask.daysLeft)}</span>
              </div>
            </section>

            <div className="border-t pt-4">
              <h4 className="font-medium text-foreground mb-2">Status</h4>
              <p className="text-sm text-muted-foreground">
                {selectedTask.completed ? "Completed" : "In Progress"}
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <CompletionSubTask
                parentId={selectedTask._id}
                isCompleted={selectedTask.completed}
                subtaskId={selectedTask._id}
              />
              <Button
                variant="outline"
                className="flex-1"
                onClick={openEditSheet}
              >
                Edit Task
              </Button>
            </div>
          </article>
        )}
        {!selectedTask && (
          <div className="space-y-6 mt-6">
            <header>
              <Skeleton className="h-8 w-3/4 mb-2 block" />
              <Skeleton className="h-4 w-1/2" />
            </header>

            <div>
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>

            {hasSubtasks && (
              <section>
                <h4 className="font-medium text-foreground mb-2">Subtasks</h4>
                <div className="space-y-2">
                  {new Array(3).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-6 w-full" />
                  ))}
                </div>
              </section>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium text-foreground mb-2">Status</h4>
              <Skeleton className="h-4 w-1/3" />
            </div>

            <div className="flex gap-2 pt-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default DetailsSheet;
