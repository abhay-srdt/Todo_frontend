const BASE_URL = "http://localhost:8080/api/todos"

export async function getAllTodos() {
  const response = await fetch(BASE_URL)
  return response.json()
}

export async function getTodosByDate(date,userId) {
  const response = await fetch(
    `${BASE_URL}/date/${userId}/${date}`
  )

  return response.json()
}

export async function createTodo(todo) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })

  return response.json()
}
export async function createTodoForUser(
  userId,
  todo
) {
  const response = await fetch(
    `${BASE_URL}/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }
  )

  return response.json()
}

export async function updateTodoById(id, todo) {
  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }
  )

  return response.json()
}

export async function deleteTodoById(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
}

export async function getTodosByUser(userId){
  const response = await fetch(`${BASE_URL}/user/${userId}`)
  return response.json();
}