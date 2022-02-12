import { postsSlice } from "features/posts/postSlice"
import { profileSlice } from "features/profile/profileSlice"
import { userSlice } from "features/users/userSlice"

const { configureStore } = require("@reduxjs/toolkit")

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    posts: postsSlice.reducer,
    profile: profileSlice.reducer,
  },
})
