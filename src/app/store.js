import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import filterReducer from "../features/ui/Filterslice";
import editReducer from "../features/ui/editSlice";
import selectedTodoReducer from "../features/ui/Selectedtodoslice"
import paginationReducer from "../features/ui/PaginationSlice"
export const store = configureStore({
    reducer:{
        ui:uiReducer,
        filter:filterReducer,
        edit:editReducer,
        selectedTodo: selectedTodoReducer,
        pagination: paginationReducer,
    }
})