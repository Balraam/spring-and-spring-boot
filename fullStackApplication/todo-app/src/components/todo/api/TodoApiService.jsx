import { clientUrl } from "./ApiClient"

export const retrieveAllTodo=(username) => clientUrl.get(`/users/${username}/todos`)
export const deleteByIdTodo=(username,id) => clientUrl.delete(`/users/${username}/todos/${id}`)
export const retrieveTodo=(username,id) => clientUrl.get(`/users/${username}/todos/${id}`)
export const updateTodo=(username,id,todo) => clientUrl.put(`/users/${username}/todos/${id}` ,todo)
export const createTodo=(username,todo) => clientUrl.post(`/users/${username}/todos` ,todo)
