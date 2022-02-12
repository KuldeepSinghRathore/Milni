import { PostForm } from "components/PostForm"
import { UserList } from "components/UserList"
import { PostList } from "features/posts/PostList"
import React from "react"

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-2">
      <PostForm />
      <PostList />
    </div>
  )
}
