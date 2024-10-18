import { DeleteTaskModal } from "./DeleteTaskModal";
import TaskBoard from "./TaskBoard";
import { TaskModal } from "./TaskModal";

export default function Tasks() {
  return (
    <section className="flex w-full justify-center">
      <TaskBoard />
      <TaskModal />
      <DeleteTaskModal />
    </section>
  );
}
