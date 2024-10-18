import { AxiosResponse } from "axios";
import { ReactNode } from "react";

export interface BasicModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
  }

export type Task ={
    id: string;
    title: string;
    description: string;
    completed: boolean;
  } 

export type TaskCreate = Omit<Task, 'id' | 'completed'>;

export type UpdateTaskOrderPayload = {
    tasks: Task[]; 
  };

export type DeleteTaskResponse = {
    success: boolean;
    message: string;
  };  

export type UpdateTaskPayload = {
    id: string;
    body: Partial<Task>;
  };
  
  export type UpdateTaskResponse = {
    success: boolean;
    task: Task; 
  };

export interface SortableItemProps {
    id: string;
    title: string;
    description?: string;
    completed?: boolean;
  }
  
export interface CustomError extends AxiosResponse {
    response: {
      data: {
        message: string;
      };
    };
  }  


 export interface TaskGetAllResponse {
    message: string;
    tasks: Task[];
  }
  
export interface TaskCreateResponse{
    message: string;
  }  