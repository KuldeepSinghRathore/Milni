// import { signUpPressed } from "features/user/userSlice"
import React, { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const SignUpForm = () => {
  //   const dispatch = useDispatch()
  //   const navigate = useNavigate()
  //   const { error } = useSelector((state) => state.users)
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [confirmPass, setConfirmPass] = useState("")
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatch(signUpPressed(signUpData))
    // navigate("/")
    console.log(JSON.stringify(signUpData))
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
          {/* {error && (
            <div className="show_info mb-4 w-max text-sm text-red-400">
              {error}
            </div>
          )} */}
          {signUpData.password.length === confirmPass.length &&
            signUpData.password !== confirmPass && (
              <div className="show_info mb-4 w-max text-sm text-red-400">
                Password Does Not Match
              </div>
            )}
          <div className="submit mb-4 cursor-pointer rounded border bg-blue-600 text-white">
            <div className="wrapper mx-auto flex w-max">
              {signUpData.password === confirmPass ? (
                <input
                  className="h-full cursor-pointer bg-transparent px-2 py-2 text-lg outline-none"
                  type="submit"
                  value="SignUp"
                />
              ) : (
                <>
                  <button
                    disabled={true}
                    className="h-full cursor-pointer px-2 py-2 text-lg outline-none "
                  >
                    SignUp
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
