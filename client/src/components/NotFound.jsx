import React from "react"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="py-60 text-center lg:py-36">
      <h1 className="py-2 text-7xl font-bold text-indigo-700 md:text-9xl">
        404
      </h1>
      <h2 className="py-2 text-2xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
        Page not found
      </h2>
      <p className="text-md py-2 px-12 text-gray-600 lg:px-96">
        Sorry! We could not find you the page you are looking for. Please check
        URL in address bar and try again.
      </p>
      <div className="text-md flex cursor-pointer justify-center text-indigo-700">
        <div className="hover:underline" onClick={() => navigate("/")}>
          Go back
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-narrow-right"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#4338CA"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1={5} y1={12} x2={19} y2={12} />
            <line x1={15} y1={16} x2={19} y2={12} />
            <line x1={15} y1={8} x2={19} y2={12} />
          </svg>
        </div>
      </div>
    </div>
  )
}
