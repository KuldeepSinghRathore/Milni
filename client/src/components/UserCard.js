import { logOutPressed } from "features/users/userSlice"
import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const UserCard = ({ singlePost, setWhatToShow }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="m-auto mb-4 flex w-full max-w-[596px]  gap-2 rounded-lg bg-white p-6 shadow-lg ">
      <div>
        <span className="flex w-4 items-center justify-center rounded-[50%] border-2 border-blue-400 bg-slate-200 px-6 py-3 hover:border-red-600">
          {singlePost?.username?.substring(0, 2)}
        </span>
      </div>
      <div className="flex-1">
        <div>
          <div>
            <h2 className="text-xl font-bold" onClick={() => navigate("/")}>
              {singlePost?.username}
            </h2>
            <p className="text-xs">@{singlePost?.username}</p>
          </div>
          <div>
            <p>{singlePost?.description}</p>
          </div>
        </div>
        <div className="  flex cursor-pointer items-center gap-2 whitespace-nowrap p-2">
          {/* <span className=" rounded-sm bg-blue-400 px-4 py-2 hover:bg-blue-600">
            Edit Bio
          </span> */}
          <span
            className="rounded-sm border-2 px-4 py-2 hover:bg-blue-600"
            onClick={() => setWhatToShow("followings")}
          >
            Following {singlePost?.following?.length}
          </span>
          <span
            className="rounded-sm border-2 px-4 py-2 hover:bg-blue-600"
            onClick={() => setWhatToShow("followers")}
          >
            {" "}
            Followers {singlePost?.followers?.length}
          </span>
        </div>
      </div>
      <div>
        <button
          onClick={() => dispatch(logOutPressed())}
          className="rounded-sm bg-blue-400 px-4 py-2 hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
