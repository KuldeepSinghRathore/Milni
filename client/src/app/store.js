import { userSlice } from "features/users/userSlice"

const { configureStore } = require("@reduxjs/toolkit")

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
})
