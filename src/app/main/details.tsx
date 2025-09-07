import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Calendar, Clock } from "lucide-react";

{
  /* Sheet component for task details */
}

export const TaskDetailSheet = ({
  selectedTask,
  markTaskComplete,
  openEditSheet,
}) => {
  return (
    <SheetContent className="w-[400px] sm:w-[540px]">
      <SheetHeader>
        <SheetTitle>Task Details</SheetTitle>
        <SheetDescription>View and manage your task</SheetDescription>
      </SheetHeader>

      {selectedTask && (
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedTask.title}
            </h3>
            <Badge priority={selectedTask.priority}></Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{selectedTask.daysLeft} days left</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
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
            <h4 className="font-medium text-gray-900 mb-2">Status</h4>
            <p className="text-sm text-gray-600">
              {selectedTask.completed ? "Completed" : "In Progress"}
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            {!selectedTask.completed && (
              <Button
                onClick={() => markTaskComplete(selectedTask.id)}
                className="flex-1"
              >
                Mark as Complete
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                openEditSheet(selectedTask);
              }}
            >
              Edit Task
            </Button>
          </div>
        </div>
      )}
    </SheetContent>
  );
};
