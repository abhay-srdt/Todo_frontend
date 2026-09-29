import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSelectedTodo } from "../features/ui/Selectedtodoslice"

function TodoItem({ todo, onDeleteTodo, onEditTodo, onToggleTodo }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleView() {
    dispatch(setSelectedTodo(todo))
    navigate("/viewTodo")
  }

  // Completed rows: faded, with the text struck through
  const doneStyle = todo.completed ? "text-gray-400 line-through" : ""

  return (
    <tr className={todo.completed ? "bg-gray-50" : ""}>
      <td className="border px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={Boolean(todo.completed)}
          onChange={() => onToggleTodo(todo)}
          aria-label={`Mark "${todo.title}" as done`}
          className="h-4 w-4 cursor-pointer"
        />
      </td>

      <td className={`border px-4 py-2 ${doneStyle}`}>
        {todo.date}
      </td>

      <td className={`border px-4 py-2 font-medium ${doneStyle}`}>
        {todo.title}
      </td>

      <td className={`border px-4 py-2 ${doneStyle}`}>
        {todo.description}
      </td>

      <td className={`border px-4 py-2 ${doneStyle}`}>
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
             type="button"
             onClick={handleView}
             className="rounded bg-green-600 px-3 py-1 text-white"
          >
              View
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