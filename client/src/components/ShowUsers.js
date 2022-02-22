import React from "react"
import { Link } from "react-router-dom"

export const ShowUsers = ({ listType, listArray, username }) => {
  return (
    <div className="flex max-w-fit flex-col justify-end gap-3 p-4 text-center">
      <h1 className="text-xl font-bold">
        {username}'s {listType}
      </h1>

      <ul className="mt-2 flex flex-col gap-4 py-2 px-2 text-center font-semibold">
        {!listArray.length > 0 ? (
          <p>No User Found</p>
        ) : (
          listArray.map((user) => {
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
