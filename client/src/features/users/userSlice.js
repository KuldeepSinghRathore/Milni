import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "utils/API"

const username = JSON.parse(localStorage.getItem("username")) || null
const userId = JSON.parse(localStorage.getItem("userId")) || null
const token = JSON.parse(localStorage.getItem("token")) || null
const email = JSON.parse(localStorage.getItem("email")) || null

const initialState = {
  username,
  userId,
  token,
  email,
  status: "idle",
  error: "",
}

const signUpPressed = createAsyncThunk({
  "users/signUpPressed": async (signUpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/signup`, signUpData)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
})

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpPressed.pending]: (state) => {
      state.status = "pending"
    },
    [signUpPressed.fulfilled]: (state, action) => {
      localStorage.setItem("username", JSON.stringify(state.username))
      localStorage.setItem("userId", JSON.stringify(state.userId))
      localStorage.setItem("token", JSON.stringify(state.token))
      localStorage.setItem("email", JSON.stringify(state.email))
      state.username = action.payload.username
      state.userId = action.payload.userId
      state.token = action.payload.token
      state.email = action.payload.email
      state.status = "fulfilled"
    },
    [signUpPressed.rejected]: (state, action) => {
      state.error = action.payload.message
      state.status = "rejected"
    },
  },
})

export default userSlice.reducer
