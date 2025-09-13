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
      <header className="flex items-center justify-between mb-2">
        <div>
          <h2 className=" text-xl md:text-2xl font-bold ">My Tasks</h2>
          <p className="text-muted-foreground">Manage your tasks effectively</p>
        </div>
        <Button onClick={createSheetSettings.open}>
          <Plus />
          Add Task
        </Button>
      </header>
      <CreateSheet {...createSheetSettings} />
      <Feed />
    </Authenticated>
  );
};

export default MainPage;
