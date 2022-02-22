import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "utils/API"

const initialState = {
  userProfileData: [],
  userProfileStatus: "idle",
  userProfileError: null,
  userProfileFollowers: [],
  userProfileFollowings: [],
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

export const getProfileUserFollowers = createAsyncThunk(
  "profile/getProfileUserFollowers",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API}/users/followers/${data.userId}`,
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
export const getProfileUserFollowings = createAsyncThunk(
  "profile/getProfileUserFollowings",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API}/users/followings/${data.userId}`,
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

    [getProfileUserFollowers.pending]: (state) => {
      state.userProfileStatus = "pending"
    },
    [getProfileUserFollowers.fulfilled]: (state, action) => {
      state.userProfileFollowers = action.payload.userProfileFollowers
      state.userProfileStatus = "fulfilled"
    },
    [getProfileUserFollowers.rejected]: (state, action) => {
      state.userProfileError = action.payload.message
      state.userProfileStatus = "rejected"
    },
    [getProfileUserFollowings.pending]: (state) => {
      state.userProfileStatus = "pending"
    },
    [getProfileUserFollowings.fulfilled]: (state, action) => {
      state.userProfileFollowings = action.payload.userProfileFollowings
      state.userProfileStatus = "fulfilled"
    },
    [getProfileUserFollowings.rejected]: (state, action) => {
      state.userProfileError = action.payload.message
      state.userProfileStatus = "rejected"
    },
    [followButtonPressed.pending]: (state) => {
      state.userProfileStatus = "pending"
    },
    [followButtonPressed.fulfilled]: (state, action) => {
      state.userProfileData.following =
        action.payload.updateFollowUser.following
      state.userProfileData.followers =
        action.payload.updateFollowUser.followers
      state.userProfileFollowers = action.payload.updateFollowUser.followers
      state.userProfileFollowings = action.payload.updateFollowUser.following
      state.userProfileStatus = "fulfilled"
    },
    [followButtonPressed.rejected]: (state, action) => {
      state.userProfileError = action.payload.message
      state.userProfileStatus = "rejected"
    },
  },
})

export default profileSlice.reducer
