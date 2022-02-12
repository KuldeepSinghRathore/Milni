import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "utils/API"

const username = JSON.parse(localStorage.getItem("username")) || null
const userId = JSON.parse(localStorage.getItem("userId")) || null
const token = JSON.parse(localStorage.getItem("token")) || null
const email = JSON.parse(localStorage.getItem("email")) || null
const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false

export const signUpPressed = createAsyncThunk(
  "users/signup",
  async (signUpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/signup`, signUpData)
      return response.data.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const loginPressed = createAsyncThunk(
  "users/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/login`, loginData)
      return response.data.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/users/allusers`, {
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

const initialState = {
  userProfile: null,
  username,
  userId,
  token,
  email,
  isLoggedIn,
  status: "idle",
  error: null,
  allUsers: [],
}

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.status = "idle"
      state.error = null
    },
    logOutPressed: (state) => {
      localStorage.clear()
      state.username = null
      state.userId = null
      state.token = null
      state.email = null
      state.isLoggedIn = false
    },
  },
  extraReducers: {
    [signUpPressed.pending]: (state) => {
      state.status = "pending"
    },
    [signUpPressed.fulfilled]: (state, action) => {
      localStorage.setItem(
        "username",
        JSON.stringify(action.payload?.user.username)
      )
      localStorage.setItem("userId", JSON.stringify(action.payload?.user?._id))
      localStorage.setItem("token", JSON.stringify(action.payload?.token))
      localStorage.setItem("email", JSON.stringify(action.payload?.user?.email))
      localStorage.setItem("isLoggedIn", JSON.stringify(true))
      state.username = action.payload?.user?.username
      state.userId = action.payload?.user?._id
      state.token = action.payload?.token
      state.email = action.payload?.user?.email
      state.userProfile = action.payload?.user
      state.isLoggedIn = true
      state.status = "fulfilled"
    },
    [signUpPressed.rejected]: (state, action) => {
      state.status = "rejected"
      state.error = action.payload.message
    },
    [loginPressed.pending]: (state) => {
      state.status = "pending"
    },
    [loginPressed.fulfilled]: (state, action) => {
      localStorage.setItem(
        "username",
        JSON.stringify(action.payload.user.username)
      )
      localStorage.setItem("userId", JSON.stringify(action.payload.user._id))
      localStorage.setItem("token", JSON.stringify(action.payload.token))
      localStorage.setItem("email", JSON.stringify(action.payload.user.email))
      localStorage.setItem("isLoggedIn", JSON.stringify(true))
      state.username = action.payload.user.username
      state.userId = action.payload.user._id
      state.token = action.payload.token
      state.email = action.payload.user.email
      state.userProfile = action.payload.user
      state.isLoggedIn = true
      state.status = "fulfilled"
    },
    [loginPressed.rejected]: (state, action) => {
      state.status = "rejected"
      state.error = action.payload.message
    },
    [getAllUsers.pending]: (state) => {
      state.status = "pending"
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload.allUsers
      state.status = "fulfilled"
    },
    [getAllUsers.rejected]: (state, action) => {
      state.error = action.payload.message
      state.status = "rejected"
    },
  },
})
export const { resetAuthStatus, logOutPressed } = userSlice.actions
export default userSlice.reducer
