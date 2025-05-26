"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface InstagramPost {
  id: string
  image: string
  url: string
  alt: string
  createdAt: string
}

interface AdminContextType {
  posts: InstagramPost[]
  isAuthenticated: boolean
  storageInfo: { used: number; available: number }
  login: (password: string) => boolean
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string) => boolean
  addPost: (post: Omit<InstagramPost, "id" | "createdAt">) => Promise<boolean>
  removePost: (id: string) => void
  updatePost: (id: string, post: Partial<InstagramPost>) => Promise<boolean>
  clearAllPosts: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const DEFAULT_PASSWORD = "salon2024"
const STORAGE_KEY = "salon_sano_posts"
const AUTH_KEY = "salon_sano_auth"
const PASSWORD_KEY = "salon_sano_password"
const MAX_STORAGE_SIZE = 4 * 1024 * 1024 // 4MB limit to be safe

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPassword, setCurrentPassword] = useState(DEFAULT_PASSWORD)
  const [storageInfo, setStorageInfo] = useState({ used: 0, available: 0 })

  // Calculate storage usage
  const updateStorageInfo = () => {
    try {
      let used = 0
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length
        }
      }
      setStorageInfo({
        used,
        available: MAX_STORAGE_SIZE - used,
      })
    } catch (error) {
      console.error("Error calculating storage:", error)
    }
  }

  // Safe localStorage operations
  const safeSetItem = (key: string, value: string): boolean => {
    try {
      // Check if adding this item would exceed our limit
      const itemSize = key.length + value.length
      if (storageInfo.used + itemSize > MAX_STORAGE_SIZE) {
        throw new Error("Storage quota would be exceeded")
      }

      localStorage.setItem(key, value)
      updateStorageInfo()
      return true
    } catch (error) {
      console.error("Storage error:", error)
      return false
    }
  }

  // Load data from localStorage on mount
  useEffect(() => {
    updateStorageInfo()

    // Initialize password first
    const savedPassword = localStorage.getItem(PASSWORD_KEY)
    if (savedPassword) {
      console.log("Found saved password:", savedPassword) // Debug log
      setCurrentPassword(savedPassword)
    } else {
      console.log("No saved password, using default:", DEFAULT_PASSWORD) // Debug log
      setCurrentPassword(DEFAULT_PASSWORD)
      localStorage.setItem(PASSWORD_KEY, DEFAULT_PASSWORD)
    }

    const savedAuth = localStorage.getItem(AUTH_KEY)

    try {
      const savedPosts = localStorage.getItem(STORAGE_KEY)
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts))
      } else {
        // Initialize with default posts
        const defaultPosts: InstagramPost[] = [
          {
            id: "1",
            image: "/placeholder.svg?height=400&width=400",
            url: "https://instagram.com/p/example1",
            alt: "Beautiful straight hair transformation",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            image: "/placeholder.svg?height=400&width=400",
            url: "https://instagram.com/p/example2",
            alt: "Keratin treatment results",
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            image: "/placeholder.svg?height=400&width=400",
            url: "https://instagram.com/p/example3",
            alt: "Healthy hair styling",
            createdAt: new Date().toISOString(),
          },
        ]
        setPosts(defaultPosts)
        safeSetItem(STORAGE_KEY, JSON.stringify(defaultPosts))
      }
    } catch (error) {
      console.error("Error loading posts:", error)
      setPosts([])
    }

    if (savedAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  // Update storage info when posts change
  useEffect(() => {
    updateStorageInfo()
  }, [posts])

  const login = (password: string): boolean => {
    console.log("Attempting login with password:", password) // Debug log
    console.log("Current stored password:", currentPassword) // Debug log

    if (password === currentPassword) {
      setIsAuthenticated(true)
      localStorage.setItem(AUTH_KEY, "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(AUTH_KEY)
  }

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    if (oldPassword === currentPassword) {
      setCurrentPassword(newPassword)
      localStorage.setItem(PASSWORD_KEY, newPassword)
      return true
    }
    return false
  }

  const addPost = async (post: Omit<InstagramPost, "id" | "createdAt">): Promise<boolean> => {
    const newPost: InstagramPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    const updatedPosts = [newPost, ...posts]
    const success = safeSetItem(STORAGE_KEY, JSON.stringify(updatedPosts))

    if (success) {
      setPosts(updatedPosts)
      return true
    } else {
      // Storage failed, don't update state
      return false
    }
  }

  const removePost = (id: string) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
    safeSetItem(STORAGE_KEY, JSON.stringify(updatedPosts))
  }

  const updatePost = async (id: string, updatedPost: Partial<InstagramPost>): Promise<boolean> => {
    const updatedPosts = posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
    const success = safeSetItem(STORAGE_KEY, JSON.stringify(updatedPosts))

    if (success) {
      setPosts(updatedPosts)
      return true
    } else {
      return false
    }
  }

  const clearAllPosts = () => {
    setPosts([])
    localStorage.removeItem(STORAGE_KEY)
    updateStorageInfo()
  }

  return (
    <AdminContext.Provider
      value={{
        posts,
        isAuthenticated,
        storageInfo,
        login,
        logout,
        changePassword,
        addPost,
        removePost,
        updatePost,
        clearAllPosts,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
