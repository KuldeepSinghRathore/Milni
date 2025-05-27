import {
  getAllUsers,
  loginPressed,
  resetAuthStatus,
} from "features/users/userSlice"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export const LoginForm = () => {
  const { error, token } = useSelector((state) => state.users)
  const { status, isLoggedIn } = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({
    email: "guest@test.com",
    password: "asdfasdf",
  })
  const [loggingIn, setLoggingIn] = useState(false)
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loginData.password !== "" && loginData.email !== "") {
      setLoggingIn(true)
      await dispatch(loginPressed(loginData))
    }
  }

  useEffect(() => {
    if (token && isLoggedIn) {
      setLoggingIn(false)
      dispatch(resetAuthStatus())
    }
  }, [token, isLoggedIn, dispatch])

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [navigate, token])

  return (
    <>
      <div className=" m-auto mt-10 w-max">
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="mb-6 text-2xl">Login</h2>
            <span className="mb-6">
              New user{" "}
              <Link to={"/signup"} className="font-bold">
                SignUp
              </Link>{" "}
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="username mb-4 flex rounded border text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-2 my-auto w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>

              <input
                className="h-full px-2 py-2 text-lg outline-none"
                type="email"
                placeholder="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                autoComplete={"off"}
              />
            </div>

            <div className="password mb-4 flex rounded border text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-2 my-auto w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <input
                className="h-full px-2 py-2 text-lg outline-none"
                type="password"
                placeholder="password"
                name="password"
                value={loginData.password}
                autoComplete={"off"}
                onChange={handleChange}
              />
            </div>

            <div className="show_info mb-4 w-max text-sm font-bold text-red-500">
              {status === "rejected" && error}
            </div>
            <input
              className="mb-4 h-full w-full  cursor-pointer rounded border bg-transparent bg-gray-800 px-2 py-2 text-lg text-white outline-none"
              type="submit"
              value={`${loggingIn ? "Logging...." : "Login"}`}
            />
          </form>
        </div>
      </div>
      {loggingIn && (
        <div className=" h-full">
          <h1 className="text-xl font-bold">
            Please wait for a minute or Retry after 2 min.
          </h1>
          <p className="text-center text-lg font-bold">
            Server Hosted On Free tier so it takes time
          </p>
        </div>
      )}
    </>
  )
}
