"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";

import { useForm } from "react-hook-form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createTaskFormSchema, createTaskFormType } from "@/constants";

interface CreateSheetProps {
  isOpen: boolean;
  close: () => void;
}

export const CreateSheet = ({ isOpen, close }: CreateSheetProps) => {
  const form = useForm<createTaskFormType>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createTask = useMutation(api.tasks.addTask);

  async function onSubmit(values: createTaskFormType) {
    if (!form.formState.isSubmitting) return;

    await createTask({ ...values, daysLeft: 1 });
    form.reset();
  }
  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="bg-secondary">
        <SheetHeader>
          <SheetTitle>Create New Task</SheetTitle>
          <SheetDescription>Add a new task to your list.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span>(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter task description"
                      {...field}
                      rows={8}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="daysLeft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Days Left</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter days left"
                      type="number"
                      {...field}
                      min={1}
                      onChange={(e) => field.onChange(Number(e.target.value))}  
                      value={field.value || ""}

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex-1"
              >
                {form.formState.isSubmitting ? "Creating..." : "Create Task"}
              </Button>
              <Button type="button" variant="outline" onClick={close}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateSheet;
