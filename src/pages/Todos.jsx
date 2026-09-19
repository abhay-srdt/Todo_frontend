import { startTransition, useEffect, useState } from "react"
import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import { useSelector,useDispatch } from "react-redux"
import { toggleForm,openForm,closeForm } from "../features/ui/uiSlice"
import {setSearchDate,setFilteredTodos,clearFilter} from "../features/ui/Filterslice" 
import { setEditingTodo } from "../features/ui/editSlice"
import {
  getTodosByDate,
  getTodosByUser,
  createTodoForUser,
  updateTodoById,
  deleteTodoById,
} from "../services/todoService"

function Todos({ user, onLogout }) {
  const [todos, setTodos] = useState([])
  const editingTodo=useSelector((state)=>state.edit.editingTodo)
  const isFormOpen = useSelector((state)=>state.ui.isFormOpen)
  const searchDate = useSelector((state)=>state.filter.searchDate)
  const isFiltering=useSelector((state)=>state.filter.isFiltering)
  const filteredTodos=useSelector((state)=>state.filter.filteredTodos)
  const dispatch=useDispatch();
  async function fetchTodos() {
    const data = await getTodosByUser(user.id)
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  async function addTodo(todo) {
    const savedTodo = await createTodoForUser(user.id, todo)

    setTodos((currentTodos) => [
      ...currentTodos,
      savedTodo,
    ])
    dispatch(closeForm())
  }

  async function fetchTodosByDate(date,userId) {
    if (!date) return

    const data = await getTodosByDate(date,userId)

    dispatch(setFilteredTodos(data))
  }
  async function deleteTodo(id) {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return
    }

    await deleteTodoById(id)

    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    )
  }

  function startEditing(todo) {
    dispatch(setEditingTodo(todo))
    dispatch(openForm())
  }

  function cancelEdit() {
    dispatch(setEditingTodo(null))
    dispatch(closeForm())
  }

  async function updateTodo(updatedTodo) {
    const savedTodo = await updateTodoById(
      updatedTodo.id,
      updatedTodo
    )

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === savedTodo.id ? savedTodo : todo
      )
    )

    dispatch(setEditingTodo(null))
    dispatch(closeForm())
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-2xl px-4">

        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          My Todo List
        </h1>

        <div className="mb-4 flex justify-between items-center">
          <p>Welcome, {user.name}</p>

          <button
            onClick={onLogout}
            className="rounded bg-red-600 px-3 py-2 text-white"
          >
            Logout
          </button>
        </div>

        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            Add Todo
          </h2>
          <button onClick={()=>dispatch(toggleForm())} 
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
            {isFormOpen? "Close":"New Todo"}
          </button>
        {isFormOpen && (
          <TodoForm
            onAddTodo={addTodo}
            editingTodo={editingTodo}
            onUpdateTodo={updateTodo}
            onCancelEdit={cancelEdit}
          />
        )}
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {isFiltering ? "Filtered Todos" : "Todos"}
            </h2>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {todos.length}
            </span>
          </div>

          <div className="mb-6 flex gap-2">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => dispatch(setSearchDate(e.target.value))}
              className="rounded-lg border border-gray-300 px-3 py-2"
            />

            <button
              onClick={() => fetchTodosByDate(searchDate,user.id)}
              className="rounded-lg bg-green-600 px-4 py-2 text-white"
            >
              Filter
            </button>

            <button
              onClick={()=>dispatch(clearFilter())}
              className="rounded-lg bg-gray-600 px-4 py-2 text-white"
            >
              Clear
            </button>
          </div>

          <TodoList
            todos={isFiltering ? filteredTodos : todos}
            onDeleteTodo={deleteTodo}
            onEditTodo={startEditing}
          />
        </section>

      </div>
    </main>
  )
}

export default Todos