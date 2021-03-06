import { PostCard } from "components/PostCard"
import { UserCard } from "components/UserCard"
import { ProfileCard } from "components/ProfileCard"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  getProfileUserFollowers,
  getProfileUserFollowings,
  getUserProfileData,
} from "./profileSlice"
import { Loader } from "components/Loader"
import { ShowUsers } from "components/ShowUsers"
import { getProfileUserPosts } from "features/posts/postSlice"
export const Profile = () => {
  const { id } = useParams()
  const { token, userId } = useSelector((state) => state.users)
  const [whatToShow, setWhatToShow] = useState("")

  const {
    userProfileStatus,
    userProfileData,

    userProfileFollowers,
    userProfileFollowings,
  } = useSelector((state) => state.profile)
  const { userProfilePosts } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  useEffect(() => {
    const data = {
      userId: id,
    }
    if (token) {
      dispatch(getUserProfileData({ data, token }))
      dispatch(getProfileUserPosts({ data, token }))
      dispatch(getProfileUserFollowers({ data, token }))
      dispatch(getProfileUserFollowings({ data, token }))
    }
  }, [id, dispatch, token])
  if (userProfileStatus === "pending") {
    return <Loader />
  }
  return (
    <div>
      {id === userId ? (
        <UserCard singlePost={userProfileData} setWhatToShow={setWhatToShow} />
      ) : (
        <ProfileCard
          singlePost={userProfileData}
          setWhatToShow={setWhatToShow}
        />
      )}
      <p className=" mb-2 w-full text-center text-xl font-bold capitalize">
        {userProfileData.username}'s Posts
      </p>
      {whatToShow === "" &&
        userProfilePosts.map((singlePost) => (
          <PostCard singlePost={singlePost} key={singlePost._id} />
        ))}
      {whatToShow === "followers" && (
        <ShowUsers
          listType={whatToShow}
          username={userProfileData.username}
          listArray={userProfileFollowers}
        />
      )}
      {whatToShow === "followings" && (
        <ShowUsers
          listType={whatToShow}
          username={userProfileData.username}
          listArray={userProfileFollowings}
        />
      )}
    </div>
  )
}
