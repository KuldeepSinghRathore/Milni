import React, { useRef, useState } from "react"
import { cloudinary_preset, cloudname } from "utils/API"

export const CloudUpload = ({ url, setUrl, setControlUpload }) => {
  const [imageSrc, setImageSrc] = useState()

  const [image, setImage] = useState()
  const ref = useRef()
  const reset = () => {
    ref.current.value = null
  }
  const handleOnChange = (changeEvent) => {
    setImage(changeEvent.target.files[0])
    const reader = new FileReader()
    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target.result)
      // setUrl(undefined)
    }
    reader.readAsDataURL(changeEvent.target.files[0])
  }
  //

  //   upload image with clodinary
  const uploadImage = () => {
    setControlUpload(true)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", cloudinary_preset)
    data.append("cloud_name", cloudname)
    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url)
        setControlUpload(false)
        setImageSrc(undefined)
        setImage(undefined)
        reset()
      })
      .catch((err) => console.log(err))
  }
  const restCloudUpload = () => {
    setUrl(undefined)
    setImageSrc(undefined)
    setImage(undefined)
    reset()
  }
  return (
    <div>
      <div className="flex  flex-col border-red-400 bg-gray-200 p-5 shadow-md">
        <input type="file" name="file" onChange={handleOnChange} ref={ref} />
        {url ? (
          <img
            src={url}
            alt="uploaded"
            className="m-2 max-h-[10rem] max-w-[10rem]"
          />
        ) : (
          imageSrc && (
            <img src={imageSrc} alt="uploaded" className="m-2 max-w-[10rem]" />
          )
        )}
        {imageSrc && !url && (
          <p>
            {" "}
            <button
              className="bg-blue-300 py-2 px-4 font-bold text-blue-900"
              onClick={uploadImage}
            >
              Upload Image
            </button>
            <button onClick={restCloudUpload}>❌</button>
          </p>
        )}
      </div>
    </div>
  )
}
