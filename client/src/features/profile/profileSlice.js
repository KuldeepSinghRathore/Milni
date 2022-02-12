import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "utils/API"

const initialState = {
  userProfileData: [],
  userProfilePosts: [],
  userProfileStatus: "idle",
  userProfileError: null,
}

export const getUserProfileData = createAsyncThunk(
  "profile/getUserData",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/users/${data.userId}`, {
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

export const followButtonPressed = createAsyncThunk(
  "profile/followButtonPressed",
  async ({ userIdToFollow, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/users/follow/${userIdToFollow}`,
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

export const getProfileUserPosts = createAsyncThunk(
  "profile/getProfileUserPosts",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/posts/${data.userId}`, {
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserProfileData.pending]: (state) => {
      state.userProfileStatus = "pending"
    },
    [getUserProfileData.fulfilled]: (state, action) => {
      state.userProfileData = action.payload.userProfileData
      state.userProfileStatus = "fulfilled"
    },
    [getUserProfileData.rejected]: (state, action) => {
      state.userProfileError = action.payload.message
      state.userProfileStatus = "rejected"
    },
    [getProfileUserPosts.pending]: (state) => {
      state.userProfileStatus = "pending"
    },
    [getProfileUserPosts.fulfilled]: (state, action) => {
      state.userProfilePosts = action.payload.userProfilePosts
      state.userProfileStatus = "fulfilled"
    },
    [getProfileUserPosts.rejected]: (state, action) => {
      state.userProfileError = action.payload.message
      state.userProfileStatus = "rejected"
    },
    [followButtonPressed.pending]: (state) => {
      state.userProfileStatus = "pending"
    },
    [followButtonPressed.fulfilled]: (state, action) => {
      state.userProfileData.following = action.payload.following
      state.userProfileData.followers = action.payload.followers
    },
    [followButtonPressed.rejected]: (state, action) => {
      state.userProfileError = action.payload.message
      state.userProfileStatus = "rejected"
    },
  },
})

export default profileSlice.reducer
