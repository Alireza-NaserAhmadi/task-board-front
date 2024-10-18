"use client";

import BasicModal from "@/components/@base/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getAllTasks,
  handle_variables,
  taskState,
} from "./redux/taskSlice";
import { AppDispatch } from "@/redux/store";

export const DeleteTaskModal: React.FC = () => {
  const state = useSelector(taskState);
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    dispatch(handle_variables({ deleteTaskModalOpen: false }));
  };

  return (
    <BasicModal open={state.deleteTaskModalOpen} onClose={handleClose}>
      <h2 className="text-3xl">Delete Task</h2>
      <div className="w-96 my-10">
        <span className="text-xl">
          Are you sure you want to delete this task?
        </span>
      </div>
      <div className="flex mt-10 gap-3">
        <button
          type="submit"
          onClick={() => {
            handleClose();
          }}
          className="bg-neutral-500	 w-full rounded-2xl  text-white font-bold h-12 hover:bg-neutral-400	 transition duration-300"
        >
          close
        </button>
        <button
          onClick={async () => {
            await dispatch(deleteTask(state.selectedId));
            dispatch(getAllTasks());
          }}
          className="bg-red-500	 w-full rounded-2xl  text-white font-bold h-12 hover:bg-red-400 transition duration-300"
        >
          delete
        </button>
      </div>
    </BasicModal>
  );
};
