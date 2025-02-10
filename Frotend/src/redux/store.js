import { configureStore } from "@reduxjs/toolkit"
import api from "./api/api"
import authSlice from "./reducers/auth"


const store = configureStore({
    reducer: {
        [api.reducerPath]:api.reducer,
        [authSlice.name]:authSlice.reducer

    },

    middleware: (mid) => ([...mid(), api.middleware])
})

export default store