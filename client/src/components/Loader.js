import React from "react"
import loader from "../assets/loader.svg"
export const Loader = () => (
  <div className="flex h-screen flex-col items-center justify-center ">
    <span className="text-xl font-bold">Loading...</span>
    <img src={loader} alt="loader" />
  </div>
)
