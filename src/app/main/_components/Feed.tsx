"use client";
import { useState } from "react";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Tasktype } from "convex/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Drawer from "./Drawer";
import TaskList from "./TaskList";

export const Feed = () => {
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
          <TaskList
            onSelectTaskId={onSelectTaskId}
            tasks={tasks}
            title="All Tasks"
          />
        </TabsContent>
        <TabsContent value="completed">
          <TaskList
            onSelectTaskId={onSelectTaskId}
            tasks={completedTasks}
            title="Completed Tasks"
          />
        </TabsContent>
        <TabsContent value="pending">
          <TaskList
            onSelectTaskId={onSelectTaskId}
            tasks={todoTasks}
            title="Todo Tasks"
          />
        </TabsContent>
      </Tabs>

      <Drawer
        isOpen={isDrawerOpen}
        close={onCloseDrawer}
        selectedTaskId={selectedTaskId}
      />
    </>
  );
};

export default Feed;
