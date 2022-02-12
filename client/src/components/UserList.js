import { getAllUsers } from "features/users/userSlice"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const UserList = () => {
  const { token, allUsers } = useSelector((state) => state.users)
  const { postStatus } = useSelector((state) => state.posts)
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    if (postStatus === "idle" && token) {
      dispatch(getAllUsers(token))
    }
  }, [token, postStatus, dispatch])

  const searchable = (arr, searchTerm) => {
    return arr.filter((user) => {
      return user.username.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  const filteredUsers = searchable(allUsers, searchTerm)
  return (
    <div className="flex max-w-fit flex-col justify-end gap-3 p-4 text-center">
      <h1 className="text-xl font-bold">UserList</h1>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="rounded-md p-1 outline-none "
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <ul className="mt-2 flex flex-col gap-4 py-2 px-2 text-center font-semibold">
        {!filteredUsers.length > 0 ? (
          <p>No User Found</p>
        ) : (
          filteredUsers.map((user) => {
            return (
              <li
                key={user._id}
                className="rounded-md bg-white px-2 hover:bg-blue-400"
              >
                <Link to={`/profile/${user._id}`}>@{user.username}</Link>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}
