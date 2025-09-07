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
  isDetailSheetOpen: boolean;
  setIsDetailSheetOpen: (open: boolean) => void;
  selectedTask: Task | null;
  markTaskComplete: (id: string) => void;
  openEditSheet: (task: Task) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
}

export const DetailsSheet = ({
  isDetailSheetOpen,
  setIsDetailSheetOpen,
  selectedTask,
  markTaskComplete,
  openEditSheet,
  toggleSubtask,
}: DetailsSheetProps) => {
  const hasSubtasks =
    selectedTask?.subtasks && selectedTask.subtasks.length > 0;
  if (selectedTask === null) {
    return null; // or some fallback UI
  }
  return (
    <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
      <SheetContent className="w-[400px] sm:w-[540px] p-4">
        <SheetHeader>
          <SheetTitle>Task Details</SheetTitle>
          <SheetDescription>View and manage your task</SheetDescription>
        </SheetHeader>

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
                setIsDetailSheetOpen(false);
                openEditSheet(selectedTask);
              }}
            >
              Edit Task
            </Button>
          </div>
        </article>
      </SheetContent>
    </Sheet>
  );
};

export default DetailsSheet;

/**
 * 
 * 
 * 
 * 
 *   <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingTask ? "Edit Task" : "Create New Task"}</SheetTitle>
            <SheetDescription>
              {editingTask ? "Update your task details below." : "Add a new task to your list."}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daysLeft">Days Left</Label>
              <Input
                id="daysLeft"
                type="number"
                min="1"
                value={formData.daysLeft}
                onChange={(e) => setFormData({ ...formData, daysLeft: Number.parseInt(e.target.value) || 1 })}
                placeholder="Enter days left"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "high" | "medium" | "low") => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {editingTask ? "Update Task" : "Create Task"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
      
      
       )
 */
