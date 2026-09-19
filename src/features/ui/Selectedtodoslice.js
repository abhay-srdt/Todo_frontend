import { createSlice } from "@reduxjs/toolkit";

const selectedTodoSlice = createSlice({
    name:"selectedTodo",
    initialState:{
        todo:null
    },
    reducers:{
        setSelectedTodo:(state,action)=>{
            state.todo = action.payload
        },
        clearSelectedTodo:(state)=>{
            state.todo=null
        },
    },
})

export const { setSelectedTodo, clearSelectedTodo } =
  selectedTodoSlice.actions
export default selectedTodoSlice.reducer
 