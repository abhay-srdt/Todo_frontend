import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name:"ui",
    initialState:{
        isFormOpen:false,
    },
    reducers:{
        toggleForm:(state)=>{
            state.isFormOpen = !state.isFormOpen;
        },
        openForm: (state) => {
          state.isFormOpen = true
        },
        closeForm:(state)=>{
            state.isFormOpen=false
        },
    },
})

export const {toggleForm,openForm,closeForm}=uiSlice.actions
export default uiSlice.reducer