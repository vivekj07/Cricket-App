import { createSlice } from "@reduxjs/toolkit";
import { getOrSavefromLocalStorage } from "../../features/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState = {
    notificationsCount: getOrSavefromLocalStorage({ key: "NotificationCount", get: true }) || 0,
    newMessagesAlert: getOrSavefromLocalStorage({ key: NEW_MESSAGE_ALERT, get: true }) || []

}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        incrementNotifications: (state) => {
            state.notificationsCount = state.notificationsCount + 1
        },
        resetNotifications: (state) => {
            state.notificationsCount = 0
        },
        newMessagesAlertCounter: (state, action) => {
            const index = state.newMessagesAlert.findIndex((i) => i.chatId == action.payload.chatId)
            if (index == -1) {
                state.newMessagesAlert.push(action.payload)

            } else {
                state.newMessagesAlert[index].count += 1
            }
        },
        resetNewMessagesAlertCounter: (state, action) => {
            const index = state.newMessagesAlert.findIndex((i) => i.chatId == action.payload.chatId)
            if (index == -1) {
                // state.newMessagesAlert.push(action.payload)

            } else {
                state.newMessagesAlert[index].count = 0
            }
        },
    }

})

export default chatSlice
export const { incrementNotifications, resetNotifications, newMessagesAlertCounter,
    resetNewMessagesAlertCounter } = chatSlice.actions