import axios from "axios"
import { API } from "utils/API"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
  posts: [],
  postStatus: "idle",
  error: null,
}

export const createPostPressed = createAsyncThunk(
  "posts/createPost",
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/posts/new`, postData, {
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

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/posts/all`, {
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

export const likeButtonPressed = createAsyncThunk(
  "posts/likeButtonPressed",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
      state.postStatus = "pending"
    },
    [createPostPressed.fulfilled]: (state, action) => {
      state.posts.unshift(action.payload.post)
      state.postStatus = "fulfilled"
    },
    [createPostPressed.rejected]: (state, action) => {
      state.error = action.payload.message
      state.postStatus = "rejected"
    },
    [getAllPosts.pending]: (state) => {
      state.postStatus = "pending"
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts
      state.postStatus = "fulfilled"
    },
    [getAllPosts.rejected]: (state, action) => {
      state.error = action.payload.message
      state.postStatus = "rejected"
    },
    [likeButtonPressed.pending]: (state) => {
      state.postStatus = "pending"
    },
    [likeButtonPressed.fulfilled]: (state, action) => {
      // state.posts = action.payload
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.updatedLikes._id
      )
      state.posts[postIndex].likes = action.payload.updatedLikes.likes
      state.postStatus = "fulfilled"
    },
    [likeButtonPressed.rejected]: (state, action) => {
      state.error = action.payload.message
      state.postStatus = "rejected"
    },
  },
})

export default postsSlice.reducer
