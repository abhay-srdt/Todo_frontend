import api from "./api"


export async function getAllTodos() {
  const response = await api.get("/todos")
  return response.data
}

export async function getTodosByDate(date,userId) {
  const response = await api.get(
    `todos/date/${userId}/${date}`
  )

  return response.data
}

export async function createTodo(todo) {
  const response = await api.post("/todos",todo)
  return response.data
}
export async function createTodoForUser(userId,todo) {
  const response = await api.post(`/todos/user/${userId}`, todo)
  return response.data
}

export async function updateTodoById(id, todo) {
  const response = await api.put(`/todos/${id}`, todo)
  return response.data
}

export async function deleteTodoById(id) {
  await api.delete(`/todos/${id}`)
}

export async function getTodosByUser(userId){
  const response = await api.get(`/todos/user/${userId}`)
  return response.data;
}