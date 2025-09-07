"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskItem from "./TaskItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Drawer from "./Drawer";
import { initialTasks, Task } from "./type";
import { useToggle } from "./useToggle";
import { CreateSheet } from "./CreateSheet";

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => initialTasks);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const isDrawerOpen = selectedTask !== null;
  const onSelectTask = (task: Task) => setSelectedTask(task);
  const onCloseDrawer = () => setSelectedTask(null);

  const todoTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const createSheetSettings = useToggle(false);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <header className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>

          <Button onClick={createSheetSettings.open}>
            <Plus />
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
      <CreateSheet {...createSheetSettings} />
    </div>
  );
}
