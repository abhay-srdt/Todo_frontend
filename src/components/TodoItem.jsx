function TodoItem({ todo, onDeleteTodo, onEditTodo }) {
  return (
    <tr>
      <td className="border px-4 py-2">
        {todo.date}
      </td>

      <td className="border px-4 py-2 font-medium">
        {todo.title}
      </td>

      <td className="border px-4 py-2">
        {todo.description}
      </td>

      <td className="border px-4 py-2">
        {todo.dueDate}
      </td>

      <td className="border px-4 py-2">
        <div className="flex gap-2">
          <button
            onClick={() => onEditTodo(todo)}
            className="rounded bg-blue-600 px-3 py-1 text-white"
          >
            Edit
          </button>

          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="rounded bg-red-600 px-3 py-1 text-white"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TodoItem