"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Tasktype } from "../../../convex/types";
import DetailsSheet from "./DetailsSheet";
import { EditSheet } from "./EditSheet";
import { useToggle } from "./useToggle";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTaskId: Tasktype["_id"];
}

export const Drawer = ({ isOpen, onClose, selectedTaskId }: DrawerProps) => {
  const editSheetSettings = useToggle(false);
  const selectedTask = useQuery(api.tasks.getTaskByID, { id: selectedTaskId! });

  return (
    <>
      <DetailsSheet
        isOpen={isOpen}
        close={onClose}
        selectedTask={selectedTask!}
        openEditSheet={editSheetSettings.open}
      />
      <EditSheet selectedTaskInfo={selectedTask!} {...editSheetSettings} />
    </>
  );
};

export default Drawer;
