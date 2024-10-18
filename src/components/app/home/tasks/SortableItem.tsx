"use client";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiEditLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { getTask, handle_variables, updateTask } from "./redux/taskSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { SortableItemProps } from "@/types";

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  title,
  description,
  completed,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [isOpen, setIsOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex flex-col items-center h-auto my-2 bg-white border border-gray-300 rounded-md cursor-grab transition-all duration-300 ${
        isOpen ? "h-auto" : "h-12"
      }`}
    >
      <div className="flex w-full h-auto px-2 justify-between items-center">
        <strong onClick={handleToggle} className="w-3/4 h-14 flex items-center">
          {title}
        </strong>
        <div className="flex w-1/4  cursor-default justify-around items-center">
          <input
            type="checkbox"
            defaultChecked={completed}
            onChange={(e) => {
              const body = { completed: e.target.checked };
              const data = {
                id,
                body,
              };
              dispatch(updateTask(data));
            }}
            className="w-6 h-6"
          />
          <RiEditLine
            className="text-2xl"
            onClick={() => {
              dispatch(getTask({ id }));
              dispatch(
                handle_variables({ taskModalOpen: true, editMode: true })
              );
            }}
          />
          <FaRegTrashAlt
            className="text-xl"
            onClick={() => {
              dispatch(
                handle_variables({ deleteTaskModalOpen: true, selectedId: id })
              );
            }}
          />
        </div>
      </div>
      {isOpen && (
        <p className="flex w-full px-2 py-2 text-gray-600">{description}</p>
      )}
    </li>
  );
};
