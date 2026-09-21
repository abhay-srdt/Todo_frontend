import { useEffect } from "react"
import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import { useSelector, useDispatch } from "react-redux"
import { toggleForm, openForm, closeForm } from "../features/ui/uiSlice"
import { setSearchDate, setFilteredTodos, clearFilter } from "../features/ui/Filterslice"
import { setEditingTodo } from "../features/ui/editSlice"
import { setPage, resetPage } from "../features/ui/PaginationSlice"
import { fetchTodos, addTodo, editTodo, removeTodo } from "../features/ui/Todoslice"
import { getTodosByDate } from "../services/todoService"

const PAGE_SIZE = 5

function Todos({ user, onLogout }) {
  const todos = useSelector((state) => state.todos.items)
  const todosStatus = useSelector((state) => state.todos.status)
  const todosError = useSelector((state) => state.todos.error)

  const editingTodo = useSelector((state) => state.edit.editingTodo)
  const isFormOpen = useSelector((state) => state.ui.isFormOpen)
  const searchDate = useSelector((state) => state.filter.searchDate)
  const isFiltering = useSelector((state) => state.filter.isFiltering)
  const filteredTodos = useSelector((state) => state.filter.filteredTodos)
  const currentPage = useSelector((state) => state.pagination.currentPage)
  const dispatch = useDispatch()

  const sourceTodos = isFiltering ? filteredTodos : todos
  const totalPages = Math.max(1, Math.ceil(sourceTodos.length / PAGE_SIZE))
  const paginatedTodos = sourceTodos.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  useEffect(() => {
    dispatch(fetchTodos(user.id))
  }, [user.id, dispatch])

  useEffect(() => {
    if (currentPage > totalPages) {
      dispatch(setPage(totalPages))
    }
  }, [totalPages, currentPage, dispatch])

  async function handleAddTodo(todo) {
    await dispatch(addTodo({ userId: user.id, todo })).unwrap()
    dispatch(closeForm())
  }

  async function fetchTodosByDate(date, userId) {
    if (!date) return
    const data = await getTodosByDate(date, userId)
    dispatch(setFilteredTodos(data))
    dispatch(resetPage())
  }

  function handleClearFilter() {
    dispatch(clearFilter())
    dispatch(resetPage())
  }

  async function handleDeleteTodo(id) {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return
    }
    dispatch(removeTodo(id))
  }

  function startEditing(todo) {
    dispatch(setEditingTodo(todo))
    dispatch(openForm())
  }

  function cancelEdit() {
    dispatch(setEditingTodo(null))
    dispatch(closeForm())
  }

  async function handleUpdateTodo(updatedTodo) {
    await dispatch(editTodo(updatedTodo)).unwrap()
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
          <button
            onClick={() => dispatch(toggleForm())}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isFormOpen ? "Close" : "New Todo"}
          </button>
          {isFormOpen && (
            <TodoForm
              onAddTodo={handleAddTodo}
              editingTodo={editingTodo}
              onUpdateTodo={handleUpdateTodo}
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
              {sourceTodos.length}
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
              onClick={() => fetchTodosByDate(searchDate, user.id)}
              className="rounded-lg bg-green-600 px-4 py-2 text-white"
            >
              Filter
            </button>

            <button
              onClick={handleClearFilter}
              className="rounded-lg bg-gray-600 px-4 py-2 text-white"
            >
              Clear
            </button>
          </div>

          {todosStatus === "loading" && (
            <p className="py-4 text-center text-gray-500">Loading todos...</p>
          )}

          {todosStatus === "failed" && (
            <p className="py-4 text-center text-red-600">{todosError}</p>
          )}

          {todosStatus === "succeeded" && (
            <>
              <TodoList
                todos={paginatedTodos}
                onDeleteTodo={handleDeleteTodo}
                onEditTodo={startEditing}
              />

              {sourceTodos.length > 0 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => dispatch(setPage(currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg bg-gray-600 px-3 py-2 text-sm text-white disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => dispatch(setPage(currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg bg-gray-600 px-3 py-2 text-sm text-white disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>

      </div>
    </main>
  )
}

export default Todos