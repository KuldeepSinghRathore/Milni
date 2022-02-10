const { configureStore } = require("@reduxjs/toolkit")
const { userSlice } = require("features/users/userSlice")

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
})
