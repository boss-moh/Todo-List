"use client";
import { Authenticated } from "convex/react";
import { useToggle } from "../../hooks/useToggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateSheet } from "./_components/CreateSheet";
import Feed from "./_components/Feed";

export const MainPage = () => {
  const createSheetSettings = useToggle(false);

  return (
    <Authenticated>
      <div className="mb-8">
        <header className="flex items-center justify-between mb-2">
          <h2 className=" text-xl md:text-2xl font-bold text-gray-900">
            My Tasks
          </h2>

          <Button onClick={createSheetSettings.open}>
            <Plus />
            Add Task
          </Button>
        </header>
        <p className="text-gray-600">Manage your tasks effectively</p>
      </div>
      <CreateSheet {...createSheetSettings} />
      <Feed />
    </Authenticated>
  );
};

export default MainPage;
