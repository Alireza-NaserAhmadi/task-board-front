import { API_URL } from "@/config/config"
import { Task, TaskCreate, UpdateTaskOrderPayload } from "@/types"
import axios from "axios"


export const TASK = 'task'

export function get_all_tasks() {
  return axios.get(API_URL + TASK )
}

export function create_task(data:TaskCreate) {
  return axios.post(API_URL + TASK, data)
}

export function get_task(id:string) {
  return axios.get(API_URL + TASK + `/${id}`)
}

export function update_task(id:string,data:Task) {

  return axios.put(API_URL + TASK + `/${id}`,data)
}

export function delete_task(id: string) {
  return axios.delete(API_URL + TASK + `/${id}`)
}

export function update_task_order(data: UpdateTaskOrderPayload) {
  return axios.post(API_URL + TASK + '/update-order', data)
}

