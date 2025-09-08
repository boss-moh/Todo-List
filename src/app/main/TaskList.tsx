"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import TaskItem from "./TaskItem";
import Drawer from "./Drawer";
import { Tasktype } from "../../../convex/types";

export const TaskList = () => {
  const tasks = useQuery(api.tasks.getTasks);

  const [selectedTaskId, setSelectedTaskId] = useState<Tasktype["_id"] | null>(
    null
  );

  if (!tasks) {
    return <div>Loading...</div>;
  }

  const isDrawerOpen = selectedTaskId !== null;
  const onSelectTaskId = (taskId: Tasktype["_id"]) => setSelectedTaskId(taskId);
  const onCloseDrawer = () => setSelectedTaskId(null);

  const todoTasks = tasks.filter((task) => !task.completed);

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-medium text-gray-500  tracking-wide">
                You have {tasks.length} tasks
              </h2>
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
                  key={task._id}
                  onSelectTaskId={onSelectTaskId}
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
                  key={task._id}
                  onSelectTaskId={onSelectTaskId}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {selectedTaskId && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={onCloseDrawer}
          selectedTaskId={selectedTaskId}
        />
      )}
    </>
  );
};

export default TaskList;
