import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:"filter",
    initialState:{
        searchDate:"",
    },
    reducers:{
        setSearchDate:(state,action)=>{
            state.searchDate=action.payload
        },
        clearSearchDate:(state)=>{
            state.searchDate=""
        },
    },
})

export const { setSearchDate, clearSearchDate } = filterSlice.actions
export default filterSlice.reducer