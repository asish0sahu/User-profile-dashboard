import { configureStore } from "@reduxjs/toolkit";

import useReducer  from "./components/Features/userSlice";


export const store = configureStore({
    reducer :{
        users :useReducer,
    },
});