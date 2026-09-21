import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getTodosByUser,
  createTodoForUser,
  updateTodoById,
  deleteTodoById,
} from "../../services/todoService"

// Each thunk wraps ONE async operation. The first argument is the action
// type prefix RTK uses to build "todos/fetchTodos/pending", etc.
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userId) => {
    const data = await getTodosByUser(userId)
    return data // becomes action.payload in the "fulfilled" case
  }
)

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ userId, todo }) => {
    const data = await createTodoForUser(userId, todo)
    return data
  }
)

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (updatedTodo) => {
    const data = await updateTodoById(updatedTodo.id, updatedTodo)
    return data
  }
)

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id) => {
    await deleteTodoById(id)
    return id // the API returns nothing useful, so we pass the id along ourselves
  }
)

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // no plain synchronous reducers needed for this slice right now
  },
  extraReducers: (builder) => {
    builder
      // --- fetchTodos ---
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })

      // --- addTodo ---
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })

      // --- editTodo ---
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        )
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })

      // --- removeTodo ---
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (todo) => todo.id !== action.payload
        )
      })
  },
})

export default todosSlice.reducer