"use client"

import { useState } from "react"

export default function AdminDebug() {
  const [showDebug, setShowDebug] = useState(false)

  const getStorageInfo = () => {
    const password = localStorage.getItem("salon_sano_password")
    const auth = localStorage.getItem("salon_sano_auth")
    const posts = localStorage.getItem("salon_sano_posts")

    return {
      password: password || "Not set",
      auth: auth || "Not set",
      postsLength: posts ? JSON.parse(posts).length : 0,
      allKeys: Object.keys(localStorage).filter((key) => key.startsWith("salon_sano")),
    }
  }

  const clearAllStorage = () => {
    if (window.confirm("Clear all salon data from localStorage?")) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("salon_sano")) {
          localStorage.removeItem(key)
        }
      })
      window.location.reload()
    }
  }

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-xs z-50"
      >
        Debug
      </button>
    )
  }

  const info = getStorageInfo()

  return (
    <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Debug Info</h3>
        <button onClick={() => setShowDebug(false)} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>

      <div className="text-xs space-y-1">
        <div>
          <strong>Password:</strong> {info.password}
        </div>
        <div>
          <strong>Auth:</strong> {info.auth}
        </div>
        <div>
          <strong>Posts:</strong> {info.postsLength}
        </div>
        <div>
          <strong>Keys:</strong> {info.allKeys.join(", ")}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <button onClick={clearAllStorage} className="w-full bg-red-500 text-white px-2 py-1 rounded text-xs">
          Clear All Data
        </button>
        <button
          onClick={() => {
            localStorage.setItem("salon_sano_password", "salon2024")
            window.location.reload()
          }}
          className="w-full bg-blue-500 text-white px-2 py-1 rounded text-xs"
        >
          Reset Password
        </button>
      </div>
    </div>
  )
}
