import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMobile: false,
    isSearch: false,
    isFileMenu: false,
    isDeleteChatMenu: false,
    DeleteChatMenuDetails: {
        chatId: "",
        groupChat: false
    },
    isProfile: false,

}

const misc = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsmobile: (state, action) => {
            state.isMobile = action.payload
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload
        },
        setIsDeleteChatMenu: (state, action) => {
            state.isDeleteChatMenu = action.payload
        },
        setDeleteChatMenuDetails: (state, action) => {
            state.DeleteChatMenuDetails = action.payload
        },
        setIsProfile:(state,action)=>{
            state.isProfile=action.payload
        }
    }
})

export default misc
export const { setIsmobile, setIsSearch, setIsFileMenu, setIsDeleteChatMenu, setDeleteChatMenuDetails,setIsProfile } = misc.actions
