import { signUpPressed } from "features/users/userSlice"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const SignUpForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, status } = useSelector((state) => state.users)
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [confirmPass, setConfirmPass] = useState("")
  const [signingUp, setSigningUp] = useState(false)
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSigningUp(true)
    await dispatch(signUpPressed(signUpData))
    navigate("/")
  }
  return (
    <div>
      <div className="main m-auto mt-10 w-max">
        <h2 className="mb-6 text-2xl">SignUp</h2>
        <form onSubmit={handleSubmit} autoComplete={"off"}>
          <div className="username mb-4 flex rounded border text-gray-500">
            <input
              className="h-full px-4 py-2 text-lg outline-none"
              type="text"
              placeholder="username"
              name="username"
              value={signUpData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="display_name mb-4 flex rounded border text-gray-500">
            <input
              className="h-full px-4 py-2 text-lg outline-none"
              type="email"
              placeholder="email"
              name="email"
              value={signUpData.email}
              onChange={handleChange}
              autoComplete={"off"}
              required
            />
          </div>
          <div className="password mb-4 flex rounded border text-gray-500">
            <input
              className="h-full px-4 py-2 text-lg outline-none"
              type="password"
              placeholder="password"
              name="password"
              value={signUpData.password}
              onChange={handleChange}
              required
              minLength="6"
              autoComplete="current-password"
            />
          </div>
          <div className="password mb-4 flex rounded border text-gray-500">
            <input
              className="h-full px-4 py-2 text-lg outline-none"
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPass(e.target.value)}
              autoComplete={"off"}
            />
          </div>
          {error && (
            <div className="show_info mb-4 w-max text-sm text-red-400">
              {status === "rejected" && error}
            </div>
          )}
          {signUpData.password.length === confirmPass.length &&
            signUpData.password !== confirmPass && (
              <div className="show_info mb-4 w-max text-sm text-red-400">
                Password Does Not Match
              </div>
            )}

          <div className="">
            {signUpData.password === confirmPass ? (
              <input
                className="mb-4 h-full w-full  cursor-pointer rounded border bg-transparent bg-gray-800 px-2 py-2 text-lg text-white outline-none"
                type="submit"
                value={`${signingUp ? "SigningUp...." : "Sign Up"}`}
              />
            ) : (
              <button
                disabled={true}
                className="mb-4 h-full w-full  cursor-pointer rounded border bg-transparent  px-2 py-2 text-lg text-black shadow-sm outline-none"
              >
                SignUp
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
