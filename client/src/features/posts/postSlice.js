import axios from "axios"
import { API } from "utils/API"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
  posts: [],
  status: "idle",
  error: null,
}

export const createPostPressed = createAsyncThunk(
  "posts/createPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [createPostPressed.pending]: (state) => {
      state.status = "pending"
    },
    [createPostPressed.fulfilled]: (state, action) => {
      state.posts.push(action.payload)
      state.status = "fulfilled"
    },
    [createPostPressed.rejected]: (state, action) => {
      state.error = action.payload.message
      state.status = "rejected"
    },
  },
})

export default postsSlice.reducer
