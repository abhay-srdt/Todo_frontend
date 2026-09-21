import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
    name:"Edit",
    initialState:{
        editingTodo:null
    },
    reducers:{
        setEditingTodo:(state,action)=>{
            state.editingTodo=action.payload
        },
    }

})

export const {setEditingTodo} = editSlice.actions
export  default editSlice.reducer