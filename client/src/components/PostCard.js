import { likeButtonPressed } from "features/posts/postSlice"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
export const isAlreadyExist = (postArr, userIdToCompare) => {
  if (!postArr.length > 0) {
    return false
  }
  return (
    postArr?.findIndex((userId) => userId.toString() === userIdToCompare) !== -1
  )
}

export const PostCard = ({ singlePost }) => {
  // const { FaCommentAlt, FaRegCommentAlt } = require("react-icons/fa")
  const { AiFillHeart, AiOutlineHeart } = require("react-icons/ai")
  const dispatch = useDispatch()
  const { token, userId } = useSelector((state) => state.users)
  const navigate = useNavigate()
  return (
    <>
      <div className="m-auto mb-4 flex w-full max-w-[596px]  gap-2 rounded-lg bg-white p-6 shadow-lg ">
        <div>
          <span className="flex w-4 items-center justify-center rounded-[50%] border-2 border-blue-400 bg-slate-200 px-6 py-3 hover:border-red-600">
            {singlePost?.userId?.username?.substring(0, 2)}
          </span>
        </div>
        <div className="flex-1">
          <div>
            <div>
              <h2
                className="cursor-pointer text-xl font-bold"
                onClick={() => navigate(`profile/${singlePost?.userId?._id}`)}
              >
                {singlePost?.userId?.username}
              </h2>
              <p className="text-xs">@{singlePost.userId.username}</p>
            </div>
            <div>
              <p>{singlePost.description}</p>
              <img
                src={singlePost.url}
                alt=""
                className="w-full  object-contain"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex   justify-between p-2">
            <div className="flex items-center gap-2">
              {isAlreadyExist(singlePost?.likes, userId) ? (
                <AiFillHeart
                  onClick={() => {
                    const data = {
                      postId: singlePost._id,
                      token,
                    }
                    dispatch(likeButtonPressed(data, token))
                  }}
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => {
                    const data = {
                      postId: singlePost._id,
                      token,
                    }
                    dispatch(likeButtonPressed(data, token))
                  }}
                />
              )}
              <span> {singlePost?.likes?.length}</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <FaRegCommentAlt />
              <FaCommentAlt /> <span> 5</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="border-gray-400 bg-gray-300 p-[1px]" />
    </>
  )
}
