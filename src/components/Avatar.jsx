import { useState } from "react"

function Avatar({ name, url, size = "h-10 w-10", textSize = "text-base" }) {
  const [failed, setFailed] = useState(false)
  const initial = (name || "?").trim().charAt(0).toUpperCase()

  if (url && !failed) {
    return (
      <img
        src={url}
        alt={name || "avatar"}
        onError={() => setFailed(true)}
        className={`${size} rounded-full object-cover`}
      />
    )
  }

  return (
    <div
      className={`${size} ${textSize} flex items-center justify-center rounded-full bg-blue-600 font-semibold text-white`}
    >
      {initial}
    </div>
  )
}

export default Avatar