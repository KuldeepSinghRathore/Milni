import { Loader } from "components/Loader"
import { PostForm } from "components/PostForm"
import { UserList } from "components/UserList"
import { PostList } from "features/posts/PostList"
import React from "react"
import { useSelector } from "react-redux"

export const HomePage = () => {
  const { status, allUsers } = useSelector((state) => state.users)
  const { postStatus, posts } = useSelector((state) => state.posts)
  if (postStatus === "pending" && posts?.length === 0) {
    return <Loader />
  }
  return (
    <div className="flex flex-col gap-2">
      <PostForm />
      <PostList />
    </div>
  )
}
