"use client";

import DetailsSheet from "./DetailsSheet";
import { Task } from "./type";
import { EditSheet } from "./EditSheet";
import { useToggle } from "./useToggle";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: Task | null;
}

export const Drawer = ({ isOpen, onClose, selectedTask }: DrawerProps) => {
  const editSheetSettings = useToggle(false);

  return (
    <>
      <DetailsSheet
        isOpen={isOpen}
        close={onClose}
        selectedTask={selectedTask}
        openEditSheet={editSheetSettings.open}
      />
      <EditSheet {...editSheetSettings} />
    </>
  );
};

export default Drawer;
