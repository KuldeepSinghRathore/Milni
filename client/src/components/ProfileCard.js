import { followButtonPressed } from "features/profile/profileSlice"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
export const ProfileCard = ({ singlePost, setWhatToShow }) => {
  const navigate = useNavigate()
  const { token, userId } = useSelector((state) => state.users)
  const { userProfileFollowers, userProfileFollowings } = useSelector(
    (state) => state.profile
  )

  const isAlreadyFollowed = userProfileFollowers?.find(
    (user) => user?._id === userId
  )
    ? true
    : false
  const dispatch = useDispatch()

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
            <h2
              className="cursor-pointer text-xl font-bold"
              onClick={() => navigate(`profile/${singlePost?.userId?._id}`)}
            >
              {singlePost.username}
            </h2>
            <p className="text-xs">@{singlePost?.username}</p>
          </div>
          <div>
            <p>{singlePost?.bio}</p>
          </div>
        </div>
        <div className="  flex cursor-pointer items-center gap-2 p-2">
          <span
            onClick={() => {
              const data = {
                userIdToFollow: singlePost?._id,
                token,
              }
              dispatch(followButtonPressed(data, token))
            }}
            className="rounded-sm bg-blue-400 px-4 py-2 hover:bg-blue-600"
          >
            {isAlreadyFollowed ? "Unfollow" : "Follow"}
          </span>
          <span
            className="rounded-sm border-2 px-4 py-2 hover:bg-blue-600"
            onClick={() => setWhatToShow("followings")}
          >
            {" "}
            Following
            {userProfileFollowings?.length}
          </span>
          <span
            className="rounded-sm border-2 px-4 py-2 hover:bg-blue-600"
            onClick={() => setWhatToShow("followers")}
          >
            {" "}
            Followers
            {userProfileFollowers?.length === 0
              ? 0
              : userProfileFollowers?.length}
          </span>
        </div>
      </div>
    </div>
  )
}
