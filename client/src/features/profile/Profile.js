import { PostCard } from "components/PostCard"
import { UserCard } from "components/UserCard"
import { ProfileCard } from "components/ProfileCard"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProfileUserPosts, getUserProfileData } from "./profileSlice"

export const Profile = () => {
  const { id } = useParams()
  console.log(id, "mujhe kpi change kr rha hain")
  const { token, userId, userProfile } = useSelector((state) => state.users)
  const { userProfileStatus, userProfileData, userProfilePosts } = useSelector(
    (state) => state.profile
  )
  const dispatch = useDispatch()
  useEffect(() => {
    const data = {
      userId: id,
    }
    if (token) {
      dispatch(getUserProfileData({ data, token }))
      dispatch(getProfileUserPosts({ data, token }))
    }
  }, [id, dispatch, token])

  return (
    <div>
      {id === userId ? (
        <UserCard singlePost={userProfileData} />
      ) : (
        <ProfileCard singlePost={userProfileData} />
      )}
      <p className=" mb-2 w-full text-center text-xl font-bold">Your Posts</p>
      {userProfilePosts.map((singlePost) => (
        <PostCard singlePost={singlePost} key={singlePost._id} />
      ))}
    </div>
  )
}
