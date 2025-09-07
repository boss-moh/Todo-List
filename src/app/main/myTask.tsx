"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Clock, Users, Calendar } from "lucide-react";
import TaskItem from "./TaskItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Drawer from "./Drawer";
import { initialTasks, Task } from "./type";

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => initialTasks);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const isDrawerOpen = selectedTask !== null;
  const onSelectTask = (task: Task) => setSelectedTask(task);
  const onCloseDrawer = () => setSelectedTask(null);

  const todoTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const openCreateSheet = () => {
    console.log("Open create task sheet");
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <header className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>

          <Button onClick={openCreateSheet}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </header>
        <p className="text-gray-600">Manage your tasks effectively</p>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                TODO
              </h2>
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {todoTasks.length}
              </span>
              ~
            </div>

            <div className="space-y-3">
              {todoTasks.map((task) => (
                <TaskItem
                  task={task}
                  key={task.id}
                  onSelectTask={onSelectTask}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                COMPLETED
              </h2>
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {completedTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {completedTasks.map((task) => (
                <TaskItem
                  task={task}
                  key={task.id}
                  onSelectTask={onSelectTask}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                COMPLETED
              </h2>
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {completedTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {completedTasks.map((task) => (
                <TaskItem
                  task={task}
                  key={task.id}
                  onSelectTask={onSelectTask}
                />
              ))}
            </div>
          </div>{" "}
        </TabsContent>
        <TabsContent value="pending">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                TODO
              </h2>
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {todoTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {todoTasks.map((task) => (
                <TaskItem
                  task={task}
                  key={task.id}
                  onSelectTask={onSelectTask}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={onCloseDrawer}
        selectedTask={selectedTask}
      />
    </div>
  );
}

/**
 *     
 * 
 * create a new component TaskFormSheet for creating and editing tasks
 *  <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {editingTask ? "Edit Task" : "Create New Task"}
            </SheetTitle>
            <SheetDescription>
              {editingTask
                ? "Update your task details below."
                : "Add a new task to your list."}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    daysLeft: Number.parseInt(e.target.value) || 1,
                  })
                }
                placeholder="Enter days left"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "high" | "medium" | "low") =>
                  setFormData({ ...formData, priority: value })
                }
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSheetOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

 */
