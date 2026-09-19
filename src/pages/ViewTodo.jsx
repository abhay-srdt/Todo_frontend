import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function ViewTodo() {
  const navigate = useNavigate()
  const todo = useSelector((state) => state.selectedTodo.todo)

  if (!todo) {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-xl bg-white p-6 text-center shadow-sm">
        <p className="text-gray-600">No todo selected.</p>
        <button
          type="button"
          onClick={() => navigate("/todos")}
          className="mt-4 rounded bg-green-600 px-3 py-1 text-white"
        >
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {todo.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
             Creation Date: {todo.date}
          </p>
          <p className="mt-1 text-sm text-gray-500">
             Due Date: {todo.dueDate}
          </p>

          <p className="mt-3 text-gray-600">
            {todo.description}
          </p>
        </div>

        <div className="flex gap-2">

          <button
             type="button"
             onClick={() => navigate("/todos")}
             className="rounded bg-green-600 px-3 py-1 text-white"
          >
              Back
          </button>

        </div>

      </div>
    </div>
  )
}

export default ViewTodo