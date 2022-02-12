import React from "react"
import { FaUserAlt } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
export const Header = () => {
  const users = useSelector((state) => state.users)
  const { userId } = useSelector((state) => state.users)
  return (
    <header className="fixed inset-x-0  top-0 mx-auto flex h-20 items-center justify-between bg-gray-50 px-6  shadow-md">
      <div className="bg-gray-300 px-3 py-1">
        <Link to="/" className="font-bold">
          Milni
        </Link>
      </div>
      <Link to="/login" className="m-3 font-bold">
        Login
      </Link>
      <div className="flex cursor-pointer items-center gap-2">
        {users?.username ? (
          <>
            {" "}
            <FaUserAlt />
            <Link to={`/profile/${userId}`}>Hi, {users?.username}</Link>
          </>
        ) : (
          <Link to="/signup">SignUp</Link>
        )}
      </div>
    </header>
  )
}
