import React from "react"
import { FaUserAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
export const Header = () => {
  return (
    <header className="mx-auto flex  items-center justify-between bg-gray-50 p-6  shadow-md">
      <div className="bg-gray-300 px-3 py-1">
        <Link to="/" className="font-bold">
          Milni
        </Link>
      </div>
      <div className="flex cursor-pointer items-center gap-2">
        <FaUserAlt />
        <span>Hi, user</span>
      </div>
    </header>
  )
}
