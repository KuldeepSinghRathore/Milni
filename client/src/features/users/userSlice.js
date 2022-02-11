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

const initialState = {
  userProfile: null,
  username,
  userId,
  token,
  email,
  isLoggedIn,
  status: "idle",
  error: "",
}

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpPressed.pending]: (state) => {
      state.status = "pending"
    },
    [signUpPressed.fulfilled]: (state, action) => {
      localStorage.setItem(
        "username",
        JSON.stringify(action.payload.user.username)
      )
      localStorage.setItem("userId", JSON.stringify(action.payload.user.userId))
      localStorage.setItem("token", JSON.stringify(action.payload.token))
      localStorage.setItem("email", JSON.stringify(action.payload.user.email))
      localStorage.setItem("isLoggedIn", JSON.stringify(true))
      state.username = action.payload.user.username
      state.userId = action.payload.user.userId
      state.token = action.payload.token
      state.email = action.payload.user.email
      state.userProfile = action.payload.user
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
      localStorage.setItem("userId", JSON.stringify(action.payload.user.userId))
      localStorage.setItem("token", JSON.stringify(action.payload.token))
      localStorage.setItem("email", JSON.stringify(action.payload.user.email))
      localStorage.setItem("isLoggedIn", JSON.stringify(true))
      state.username = action.payload.user.username
      state.userId = action.payload.user.userId
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
  },
})

export default userSlice.reducer
