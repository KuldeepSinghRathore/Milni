import { PostForm } from "components/PostForm"
import { PostList } from "features/posts/PostList"
import React from "react"

export const HomePage = () => {
  return (
    <div className="">
      {/* <PostForm /> */}
      <PostList />
    </div>
  )
}
