"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  getAllTasks,
  handle_variables,
  taskState,
  updateTaskOrder,
} from "./redux/taskSlice";
import { Task } from "@/types";
import { HashLoader } from "react-spinners";

const TaskBoard: React.FC = () => {
  const state = useSelector(taskState);
  const dispatch: AppDispatch = useDispatch();
  const [tasks, setTasks] = useState(state.task);
  const [isClient, setIsClient] = useState(false);
  const hasFetchedTasks = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !hasFetchedTasks.current) {
      dispatch(getAllTasks());
      hasFetchedTasks.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    setTasks(state.tasks);
  }, [state.tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((task: Task) => task.id === active.id);
      const newIndex = tasks.findIndex((task: Task) => task.id === over?.id);

      if (newIndex !== -1) {
        const updatedTasks = arrayMove(tasks, oldIndex, newIndex).map(
          (task, index) => {
            if (task && typeof task === "object") {
              return {
                ...task,
                order: index + 1,
              };
            }
            return task;
          }
        );

        setTasks(updatedTasks);

        const body = {
          tasks: updatedTasks as Task[],
        };

        dispatch(updateTaskOrder(body));
      }
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <section className="w-96 py-5 bg-white px-2 mt-10 rounded">
      <button
        onClick={() => {
          dispatch(handle_variables({ taskModalOpen: true, editMode: false }));
        }}
        className="bg-[#5248AC] ms-3 text-white py-2 px-3 rounded hover:text-[#0dcaf0] hover:bg-white transition-colors duration-500"
      >
        Add Task +
      </button>
      {state?.tasksLoading ? (
        <div className="flex items-center mt-5 justify-center h-14 w-full">
          <HashLoader color="#5248AC" />
        </div>
      ) : (
        <>
          {tasks.length === 0 ? (
            <div className="w-full flex justify-center items-center text-xl font-bold	 mt-5 bg-[#f8f9fa] h-20">
              empty
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
              >
                <ul className="bg-[#f8f9fa] mt-10 py-3 px-2 rounded">
                  {tasks.map((task: Task) => (
                    <SortableItem
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      completed={task.completed}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          )}
        </>
      )}
    </section>
  );
};

export default TaskBoard;
