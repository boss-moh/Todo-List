import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tasktype } from "../../../convex/types";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSubtaskSchema, addSubtaskType } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const getTaskProgress = (task: Tasktype) => {
  if (task.subtasks.length === 0) return task.completed ? 100 : 0;
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.completed
  ).length;
  return Math.round((completedSubtasks / task.subtasks.length) * 100);
};

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
  const hasSubtasks =
    selectedTask?.subtasks && selectedTask.subtasks.length > 0;

  const handleMarkAsComplete = useMutation(api.tasks.markAsComplete);

  const handle = () => {
    handleMarkAsComplete({ id: selectedTask!._id });
  };

  const form = useForm({
    resolver: zodResolver(addSubtaskSchema),
    defaultValues: {
      title: "",
    },
  });

  const addSubTaskHandle = useMutation(api.tasks.addSubtask);
  const toggleSubTaskHandle = useMutation(api.tasks.toggleSubtask);
  const deleteSubTaskHandle = useMutation(api.tasks.deleteSubTask);

  async function onSubmit(values: addSubtaskType) {
    if (!form.formState.isSubmitting) return;

    await addSubTaskHandle({ ...values, taskId: selectedTask!._id });
    form.reset();
  }

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="w-[400px] sm:w-[540px] p-4 overflow-y-scroll">
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
                    <div key={subtask.id} className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={subtask.completed}
                          onCheckedChange={() =>
                            toggleSubTaskHandle({
                              taskId: selectedTask._id,
                              subtaskId: subtask.id,
                            })
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          deleteSubTaskHandle({
                            taskId: selectedTask._id,
                            subtaskId: subtask.id,
                          })
                        }
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
                <div className=" flex gap-2 items-center">
                  <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Add a subtask..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    size="sm"
                    type="submit"
                    disabled={
                      form.formState.isSubmitting || !form.formState.isValid
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>

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
                  className="flex-1"
                  // onClick={() => handleMarkAsComplete({ id: selectedTask._id })}
                  onClick={() => handle()}
                >
                  Mark as Complete
                </Button>
              )}
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
      </SheetContent>
    </Sheet>
  );
};

export default DetailsSheet;
