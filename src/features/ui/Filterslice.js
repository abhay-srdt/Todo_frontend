import { createSlice } from "@reduxjs/toolkit";
import { create } from "axios";

const filterSlice = createSlice({
    name:"filter",
    initialState:{
        searchDate:"",
        isFiltering:false,
        filteredTodos:[],
    },
    reducers:{
        setSearchDate:(state,action)=>{
            state.searchDate=action.payload
        },
        setFilteredTodos:(state,action)=>{
            state.filteredTodos=action.payload
            state.isFiltering=true
        },
        clearFilter:(state)=>{
            state.searchDate=""
            state.filteredTodos=[]
            state.isFiltering=false
        },
    },
})

export const { setSearchDate,setFilteredTodos,clearFilter} = filterSlice.actions
export default filterSlice.reducer