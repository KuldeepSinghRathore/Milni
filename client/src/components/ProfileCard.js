import { followButtonPressed } from "features/profile/profileSlice"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
export const ProfileCard = ({ singlePost }) => {
  const { token } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  return (
    <div className="m-auto mb-4 flex w-full max-w-[596px]  gap-2 rounded-lg bg-white p-6 shadow-lg ">
      <div>
        <span className="flex w-4 items-center justify-center rounded-[50%] border-2 border-blue-400 bg-slate-200 px-6 py-3 hover:border-red-600">
          SR
        </span>
      </div>
      <div className="flex-1">
        <div>
          <div>
            <h2 className="text-xl font-bold">{singlePost.username}</h2>
            <p className="text-xs">@{singlePost.username}</p>
          </div>
          <div>
            <p>{singlePost?.bio}</p>
          </div>
        </div>
        <div className="  flex cursor-pointer items-center gap-2 p-2">
          <span
            onClick={() => {
              const data = {
                userIdToFollow: singlePost._id,
                token,
              }
              dispatch(followButtonPressed(data, token))
            }}
            className="rounded-sm bg-blue-400 px-4 py-2 hover:bg-blue-600"
          >
            {" "}
            Follow
          </span>
          <span className="rounded-sm border-2 px-4 py-2 hover:bg-blue-600">
            {" "}
            Following{singlePost?.following?.length}
          </span>
          <span className="rounded-sm border-2 px-4 py-2 hover:bg-blue-600">
            {" "}
            Followers{singlePost?.followers?.length}
          </span>
        </div>
      </div>
    </div>
  )
}
