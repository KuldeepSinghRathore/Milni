import { PostCard } from "components/PostCard"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPosts } from "./postSlice"
const singlePost = {
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. D",
  username: "Samay Raina",
  url: "https://res.cloudinary.com/narutoloves/image/upload/v1644600516/naruto-uploads/zxynvkuyrinkswyldtnp.png",
}
export const PostList = () => {
  const { posts } = useSelector((state) => state.posts)
  console.log(posts)
  const dispatch = useDispatch()
  const { status, token } = useSelector((state) => state.users)
  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllPosts(token))
    }
  }, [dispatch, status, token])
  return (
    <div className="md:m-auto  md:w-max">
      {/* <PostCard singlePost={singlePost} /> */}
      {posts.map((singlePost) => (
        <PostCard singlePost={singlePost} key={singlePost._id} />
      ))}
    </div>
  )
}
