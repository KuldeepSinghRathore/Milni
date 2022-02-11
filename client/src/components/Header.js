import React from "react"
import { FaUserAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
export const Header = () => {
  return (
    <header className="fixed inset-x-0  top-0 mx-auto flex h-20 items-center justify-between bg-gray-50 px-6  shadow-md">
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
