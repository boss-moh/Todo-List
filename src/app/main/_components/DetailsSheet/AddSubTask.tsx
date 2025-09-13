"use client";

import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addSubtaskSchema, addSubtaskType } from "@/constants";

import { Id } from "convex/_generated/dataModel";

type AddSubTaskProps = {
  parentTaskId: Id<"tasks">;
};

export const AddSubTask = ({ parentTaskId }: AddSubTaskProps) => {
  const form = useForm({
    resolver: zodResolver(addSubtaskSchema),
    defaultValues: {
      title: "",
    },
  });

  const addSubTaskHandle = useMutation(api.tasks.addSubtask);

  async function onSubmit(values: addSubtaskType) {
    if (!form.formState.isSubmitting) return;

    await addSubTaskHandle({ ...values, taskId: parentTaskId });
    form.reset();
  }

  return (
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
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddSubTask;
