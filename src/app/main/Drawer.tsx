/** here this component will be used for the drawer functionality */

import { Sheet } from "@/components/ui/sheet";
import { TaskDetailSheet } from "./details";
import DetailsSheet from "./DetailsSheet";
import { Task } from "./type";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: Task | null;
  markTaskComplete: (taskId: string) => void;
  openEditSheet: () => void;
}

export const Drawer = ({
  isOpen,
  onClose,
  selectedTask,
  markTaskComplete,
  openEditSheet,
}: DrawerProps) => {
  console.log("Drawer component rendered with isOpen:", isOpen);

  return (
    <>
      <DetailsSheet
        isDetailSheetOpen={isOpen}
        setIsDetailSheetOpen={onClose}
        selectedTask={selectedTask}
      />
    </>
  );
};

export default Drawer;
