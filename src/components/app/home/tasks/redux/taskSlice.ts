import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { toast } from "react-toastify";
import { create_task, delete_task, get_all_tasks, get_task, update_task, update_task_order } from "./taskApi";
import { CustomError, DeleteTaskResponse, Task, TaskCreate, TaskCreateResponse, TaskGetAllResponse, TaskGetResponse, UpdateTaskOrderPayload, UpdateTaskPayload, UpdateTaskResponse } from "@/types";





const initialState: {
  tasks: Task[];
  taskModalOpen: boolean;
  edithMode :boolean;
  task: Task | null;
  getTaskLoading : boolean;
  deleteTaskModalOpen: boolean;
  selectedId : string | null;
  tasksLoading : boolean
} = {
  tasks: [], 
  taskModalOpen: false,
  edithMode : false,
  task: null,
  getTaskLoading: false,
  deleteTaskModalOpen:false,
  selectedId: null,
  tasksLoading : false
};




export const getAllTasks = createAsyncThunk
<AxiosResponse<TaskGetAllResponse>,
void,
{ rejectValue: CustomError }
>(
  "task/getAllTask",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_all_tasks();
      return response.data;
    } catch (err) {
      const customError = err as CustomError;
      toast.error(customError?.response?.data?.message);
      return rejectWithValue(customError); 
    }
  }
);

export const createTask = createAsyncThunk
<TaskCreateResponse, 
 TaskCreate , 
{ rejectValue: CustomError } 
>(
  "task/createTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await create_task(data);
      return response.data;
    } catch (err) {
      const customError = err as CustomError;
      toast.error(customError?.response?.data?.message);
      return rejectWithValue(customError); 
    }
  }
);

export const getTask = createAsyncThunk
<AxiosResponse<TaskGetResponse>,
{ id: string;}, 
{ rejectValue: CustomError }
>(
  'task/getTask',
  async ({id}) => {
    try {
      const response = await get_task(id)
      return response.data
    } catch (err) {
      const customError = err as CustomError
      toast.error(customError?.response?.data?.message)
      Promise.reject(err)
    }
  }
)

export const updateTask = createAsyncThunk<
AxiosResponse<UpdateTaskResponse>, 
UpdateTaskPayload, 
{ rejectValue: CustomError }
>('task/updateTask', async (data:UpdateTaskPayload) => {
  try {
    const response = await update_task(data.id, data.body)
    return response.data
  } catch (err) {
    const customError = err as CustomError
    toast.error(customError?.response?.data?.message)
    Promise.reject(err)
  }
})

export const deleteTask = createAsyncThunk<
AxiosResponse<DeleteTaskResponse>, 
string, 
{ rejectValue: CustomError }
>('task/deleteTask', async (id: string) => {
  try {
    const response = await delete_task(id)
    return response.data
  } catch (err) {
    const customError = err as CustomError
    toast.error(customError?.response?.data?.message)
    Promise.reject(err)
  }
})

export const updateTaskOrder = createAsyncThunk
<AxiosResponse<TaskCreateResponse>, 
UpdateTaskOrderPayload, 
{ rejectValue: CustomError } 
>(
  "task/updateTaskOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await update_task_order(data);
      return response.data;
    } catch (err) {
      const customError = err as CustomError;
      toast.error(customError?.response?.data?.message);
      return rejectWithValue(customError); 
    }
  }
);



const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    handle_variables: (state, action) => {
      const data = action.payload;
      state = { ...state, ...data };
      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
       state.tasksLoading = true
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
          state.tasks = action.payload.data.tasks;
          state.tasksLoading = false
      })
      .addCase(createTask.fulfilled, (state, action) => {
        
          toast.success(action.payload.message)
          state.taskModalOpen = false
        
      })
      .addCase(getTask.pending, (state) => {
      state.getTaskLoading = true
      })
      .addCase(getTask.fulfilled, (state, action:any) => {
          state.getTaskLoading = false
          state.task = action.payload.data.task
      })
      .addCase(updateTask.fulfilled, (state, action: any) => {
       
        toast.success(action.payload?.message)
          state.taskModalOpen = false
      })
      .addCase(deleteTask.fulfilled, (state, action: any) => {
        toast.success(action.payload.message)
        state.deleteTaskModalOpen = false
      })
    
  },
});

export const { handle_variables } = taskSlice.actions;

export const taskState = (state: any) => state.task;

export default taskSlice.reducer;
