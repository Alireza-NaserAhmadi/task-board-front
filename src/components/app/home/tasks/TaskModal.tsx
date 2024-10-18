"use client";

import BasicModal from "@/components/@base/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  getAllTasks,
  handle_variables,
  taskState,
  updateTask,
} from "./redux/taskSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { applyFormResolver, ApplyFormType } from "./Schema";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export const TaskModal: React.FC = () => {
  const state = useSelector(taskState);
  const dispatch: AppDispatch = useDispatch();

  const [submitLoading, setSubmitLoading] = useState(false);

  const methods = useForm<ApplyFormType>({
    mode: "onSubmit",
    resolver: applyFormResolver,
  });

  const { setValue } = methods;

  useEffect(() => {
    if (state.editMode) {
      setValue("title", state?.task?.title || "");
      setValue("description", state?.task?.description || "");
    } else {
      setValue("title", "");
      setValue("description", "");
    }
  }, [state.editMode, state?.task]);

  const handleClose = () => {
    dispatch(handle_variables({ taskModalOpen: false }));
  };

  const onSubmitHandler: SubmitHandler<ApplyFormType> = async (data) => {
    try {
      setSubmitLoading(true);
      const body = {
        title: data?.title,
        description: data?.description,
      };

      if (!state.editMode) {
        await dispatch(createTask(body));
      } else {
        const data = {
          id: state?.task?.id,
          body,
        };
        await dispatch(updateTask(data));
      }

      dispatch(getAllTasks());
      methods.reset();
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
      console.log(error);
    }
  };

  return (
    <BasicModal open={state.taskModalOpen} onClose={handleClose}>
      <h2 className="text-3xl">
        {state.editMode ? "Edit Task" : "Create Task"}
      </h2>
      <form
        onSubmit={methods.handleSubmit(onSubmitHandler)}
        id="apply_position"
        className="flex flex-col w-full"
      >
        <div className="w-48 md:w-80 lg:w-96">
          <div className="w-full flex flex-col mt-5 relative gap-1">
            <label className="px-2">Title</label>
            <input
              type="text"
              title={"title"}
              required
              defaultValue={state.editMode ? state?.task?.title : undefined}
              placeholder={"title"}
              className="px-4 py-2 w-full border border-gray-4 rounded-2xl focus:border-gray-12 bg-transparent "
              {...methods.register("title")}
            />
            <p>{methods.formState.errors.title?.message}</p>
          </div>

          <div className="w-full flex flex-col mt-3  gap-1">
            <label className="px-2">Description</label>
            <textarea
              title={"description"}
              required
              rows={7}
              placeholder={"description"}
              className="px-4 py-2 w-full border border-gray-4 rounded-2xl focus:border-gray-12 bg-transparent "
              {...methods.register("description")}
            />
            <p>{methods.formState.errors.description?.message}</p>
          </div>
          <div className="flex mt-5 gap-3">
            <button
              onClick={() => {
                handleClose();
              }}
              className="bg-red-500	 w-full rounded-2xl  text-white font-bold h-12 hover:bg-red-400 transition duration-300"
            >
              close
            </button>
            <button
              type="submit"
              className="bg-emerald-500	 w-full rounded-2xl  text-white font-bold h-12 hover:bg-emerald-400 transition duration-300"
            >
              {submitLoading ? <BeatLoader size={3} color="white" /> : "submit"}
            </button>
          </div>
        </div>
      </form>
    </BasicModal>
  );
};
