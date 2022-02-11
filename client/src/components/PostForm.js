import { createPostPressed } from "features/posts/postSlice"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CloudUpload } from "./CloudUpload"

export const PostForm = () => {
  const [description, setDescription] = useState("")
  const { token } = useSelector((state) => state.users)
  const { postStatus, error } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const [url, setUrl] = useState()
  const [controlUpload, setControlUpload] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (description !== "" && !controlUpload) {
      // console.log(description, url)
      const postData = {
        description,
        url,
      }
      dispatch(createPostPressed({ postData, token }))
    }
  }

  useEffect(() => {
    if (postStatus === "fulfilled") {
      setDescription("")
      setUrl("")
    }
  }, [postStatus])

  return (
    <div className=" mt-6 flex items-center  justify-center ">
      <form
        className="flex  flex-col border-red-400 bg-gray-200 p-5 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className=" ">
          <textarea
            name="description"
            className="h-full min-h-[8rem] w-[100%] border-2  px-2 py-2 text-lg outline-none"
            placeholder="what's on your mind"
            autoFocus={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* <input type="file" name="file" /> */}
        <CloudUpload
          url={url}
          setUrl={setUrl}
          setControlUpload={setControlUpload}
        />
        <div className="flex flex-col justify-between gap-3">
          <input
            type="submit"
            className="w-fit self-end bg-blue-400 py-2 px-4 font-bold text-blue-900"
            value={"Create Post"}
          />
        </div>
      </form>
    </div>
  )
}
