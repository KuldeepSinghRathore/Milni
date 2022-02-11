import React from "react"

export const PostCard = ({ singlePost }) => {
  const { FaCommentAlt, FaRegCommentAlt } = require("react-icons/fa")
  const { AiFillHeart, AiOutlineHeart } = require("react-icons/ai")

  return (
    <>
      <div className="m-auto mb-4 flex w-full max-w-[596px]  gap-2 rounded-lg bg-white p-6 shadow-lg ">
        <div>
          <span className="flex w-4 items-center justify-center rounded-[50%] border-2 border-blue-400 bg-slate-200 px-6 py-3 hover:border-red-600">
            SR
          </span>
        </div>
        <div className="flex-1">
          <div>
            <div>
              <h2 className="text-xl font-bold">
                {singlePost.userId.username}
              </h2>
              <p className="text-xs">@{singlePost.userId.username}</p>
            </div>
            <div>
              <p>{singlePost.description}</p>
              <img
                src={singlePost.url}
                alt=""
                className="w-full  object-contain"
              />
            </div>
          </div>
          <div className="flex   justify-between p-2">
            <div className="flex items-center gap-2">
              <AiOutlineHeart />
              <AiFillHeart />
              <span> 5</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegCommentAlt />
              <FaCommentAlt /> <span> 5</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-gray-400 bg-gray-300 p-[1px]" />
    </>
  )
}
