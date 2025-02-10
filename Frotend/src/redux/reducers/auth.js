import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loader: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExist: (state, action) => {
            console.log("userExist")
            state.user = action.payload;
            state.loader = false
        },
        userNotExist: (state) => {
            console.log("userNotExist")
            state.user = null;
            state.loader = false
        },
        
    }

})
export const { userExist, userNotExist } = authSlice.actions
export default authSlice