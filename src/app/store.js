import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import filterReducer from "../features/ui/Filterslice";
import editReducer from "../features/ui/editSlice";
export const store = configureStore({
    reducer:{
        ui:uiReducer,
        filter:filterReducer,
        edit:editReducer,
    }
})