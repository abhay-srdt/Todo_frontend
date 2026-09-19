import { useEffect, useState } from "react"

function TodoForm({
  onAddTodo,
  editingTodo,
  onUpdateTodo,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState({
    dueDate: "",
    title: "",
    description: "",
  })

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        dueDate: editingTodo.date,
        title: editingTodo.title,
        description: editingTodo.description,
      })
    }
  }, [editingTodo])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (editingTodo) {
      const updatedTodo = {
        ...editingTodo,
        ...formData,
      }

      onUpdateTodo(updatedTodo)
    } else {
      onAddTodo(formData)
    }

    setFormData({
      dueDate: "",
      title: "",
      description: "",
    })
  }

  function handleCancel() {
    setFormData({
      dueDate: "",
      title: "",
      description: "",
    })

    onCancelEdit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Due Date
        </label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter todo title"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter todo description"
          rows="4"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        {editingTodo ? "Update Todo" : "Add Todo"}
      </button>

      {editingTodo && (
        <button
          type="button"
          onClick={handleCancel}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
      )}
    </form>
  )
}

export default TodoForm