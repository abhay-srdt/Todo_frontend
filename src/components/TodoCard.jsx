function TodoCard({ todo, onDeleteTodo, onEditTodo }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">

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
            onClick={() => onEditTodo(todo)}
            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            Edit
          </button>

          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}

export default TodoCard