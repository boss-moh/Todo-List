"use client";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Tasktype } from "convex/types";

import DetailsSheet from "../DetailsSheet";
import { EditSheet } from "./EditSheet";
import { useToggle } from "@/hooks";

interface DrawerProps {
  isOpen: boolean;
  close: () => void;
  selectedTaskId: Tasktype["_id"] | null;
}

export const Drawer = ({ isOpen, close, selectedTaskId }: DrawerProps) => {
  const editSheetSettings = useToggle(false);
  const selectedTask = useQuery(api.tasks.getTaskByID, { id: selectedTaskId });
  return (
    <>
      <DetailsSheet
        isOpen={isOpen}
        close={close}
        selectedTask={selectedTask!}
        openEditSheet={editSheetSettings.open}
      />
      {selectedTask && (
        <EditSheet selectedTaskInfo={selectedTask} {...editSheetSettings} />
      )}
    </>
  );
};

export default Drawer;
