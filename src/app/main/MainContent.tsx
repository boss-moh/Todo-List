"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToggle } from "./useToggle";
import { CreateSheet } from "./CreateSheet";
import TaskList from "./TaskList";

export default function MyTasks() {
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
      <CreateSheet {...createSheetSettings} />
      <TaskList />
    </div>
  );
}
