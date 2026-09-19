import TodoItem from "./TodoItem"

function TodoList({ todos , onDeleteTodo , onEditTodo}) {
  if (todos.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        No todos yet.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Due Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDeleteTodo={onDeleteTodo}
              onEditTodo={onEditTodo}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default TodoList