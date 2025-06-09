"use client"

import type React from "react"
import Image from "next/image"; // Added import
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  Upload,
  X,
  Settings,
  Camera,
  AlertTriangle,
  HardDrive,
} from "lucide-react"
import { useAdmin } from "@/contexts/AdminContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { compressImage, formatStorageSize } from "@/utils/imageUtils"
import PasswordChangeModal from "./PasswordChangeModal"
import HomeIcon from "./HomeIcon"

export default function AdminDashboard() {
  const { posts, logout, addPost, removePost, updatePost, clearAllPosts, storageInfo } = useAdmin()
  const { isRTL } = useLanguage()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [editingPost, setEditingPost] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    image: "",
    url: "",
    alt: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError("")

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError(isRTL ? "אנא בחר קובץ תמונה תקין" : "Please select a valid image file")
      return
    }

    // Validate file size (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError(isRTL ? "גודל הקובץ חייב להיות קטן מ-10MB" : "File size must be less than 10MB")
      return
    }

    setIsUploading(true)

    try {
      // Compress the image
      const compressedImage = await compressImage(file, 800, 0.7)

      // Check compressed size
      if (compressedImage.length > 500000) {
        // 500KB limit for compressed image
        const smallerImage = await compressImage(file, 600, 0.5)
        setImagePreview(smallerImage)
        setFormData({ ...formData, image: smallerImage })
      } else {
        setImagePreview(compressedImage)
        setFormData({ ...formData, image: compressedImage })
      }

      setIsUploading(false)
    } catch (error) {
      console.error("Error compressing image:", error)
      setUploadError(isRTL ? "שגיאה בעיבוד התמונה" : "Error processing image")
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploadError("")

    try {
      let success = false

      if (editingPost) {
        success = await updatePost(editingPost, formData)
        if (success) {
          setEditingPost(null)
        }
      } else {
        success = await addPost(formData)
        if (success) {
          setShowAddForm(false)
        }
      }

      if (!success) {
        setUploadError(
          isRTL
            ? "שגיאה בשמירה - אין מספיק מקום באחסון. נסה להקטין את התמונה או למחוק פוסטים ישנים"
            : "Storage error - not enough space. Try a smaller image or delete old posts",
        )
        return
      }

      setFormData({ image: "", url: "", alt: "" })
      setImagePreview(null)
    } catch (error) {
      console.error("Error saving post:", error)
      setUploadError(isRTL ? "שגיאה בשמירת הפוסט" : "Error saving post")
    }
  }

  const handleEdit = (post: { image: string; url: string; alt: string; id: string }) => {
    setFormData({
      image: post.image,
      url: post.url,
      alt: post.alt,
    })
    setImagePreview(post.image)
    setEditingPost(post.id)
    setShowAddForm(true)
    setUploadError("")
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingPost(null)
    setFormData({ image: "", url: "", alt: "" })
    setImagePreview(null)
    setUploadError("")
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleClearAllPosts = () => {
    if (
      window.confirm(isRTL ? "האם אתה בטוח שברצונך למחוק את כל הפוסטים?" : "Are you sure you want to delete all posts?")
    ) {
      clearAllPosts()
    }
  }

  const storagePercentage = (storageInfo.used / (storageInfo.used + storageInfo.available)) * 100

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Home Icon */}
      <HomeIcon position={isRTL ? "top-right" : "top-left"} variant="floating" />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max section-padding">
          <div className={`flex items-center justify-between h-16 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div>
              <h1 className={`text-2xl font-bold ${isRTL ? "font-heebo" : ""}`}>
                {isRTL ? "ניהול פוסטים" : "Posts Management"}
              </h1>
              {/* Storage Info */}
              <div
                className={`flex items-center space-x-2 text-sm text-gray-500 mt-1 ${isRTL ? "space-x-reverse font-heebo" : ""}`}
              >
                <HardDrive size={14} />
                <span>
                  {formatStorageSize(storageInfo.used)} / {formatStorageSize(storageInfo.used + storageInfo.available)}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      storagePercentage > 80 ? "bg-red-500" : storagePercentage > 60 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <div className={`flex items-center space-x-4 ${isRTL ? "space-x-reverse" : ""}`}>
              {posts.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearAllPosts}
                  className={`btn-secondary flex items-center space-x-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white ${isRTL ? "space-x-reverse font-heebo" : ""}`}
                >
                  <Trash2 size={16} />
                  <span>{isRTL ? "מחק הכל" : "Clear All"}</span>
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPasswordModal(true)}
                className={`btn-secondary flex items-center space-x-2 ${isRTL ? "space-x-reverse font-heebo" : ""}`}
              >
                <Settings size={20} />
                <span>{isRTL ? "שנה סיסמה" : "Change Password"}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(true)}
                className={`btn-primary flex items-center space-x-2 ${isRTL ? "space-x-reverse font-heebo" : ""}`}
              >
                <Plus size={20} />
                <span>{isRTL ? "הוסף פוסט" : "Add Post"}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className={`btn-secondary flex items-center space-x-2 ${isRTL ? "space-x-reverse font-heebo" : ""}`}
              >
                <LogOut size={20} />
                <span>{isRTL ? "התנתק" : "Logout"}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max section-padding py-8">
        {/* Storage Warning */}
        {storagePercentage > 80 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
          >
            <div className={`flex items-center space-x-3 ${isRTL ? "space-x-reverse" : ""}`}>
              <AlertTriangle size={20} className="text-yellow-600" />
              <div className={isRTL ? "font-heebo text-right" : ""}>
                <h3 className="font-semibold text-yellow-800">{isRTL ? "אחסון כמעט מלא" : "Storage Almost Full"}</h3>
                <p className="text-yellow-700 text-sm">
                  {isRTL
                    ? "מומלץ למחוק פוסטים ישנים או להשתמש בתמונות קטנות יותר"
                    : "Consider deleting old posts or using smaller images"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                <h2 className={`text-xl font-bold ${isRTL ? "font-heebo" : ""}`}>
                  {editingPost ? (isRTL ? "ערוך פוסט" : "Edit Post") : isRTL ? "הוסף פוסט חדש" : "Add New Post"}
                </h2>
                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              {uploadError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
                >
                  <div className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse" : ""}`}>
                    <AlertTriangle size={16} className="text-red-600" />
                    <p className={`text-red-700 text-sm ${isRTL ? "font-heebo text-right" : ""}`}>{uploadError}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload Section */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isRTL ? "font-heebo text-right" : ""}`}>
                    {isRTL ? "תמונה" : "Image"}
                  </label>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-4">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={500} // Added width
                        height={300} // Added height
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <p className={`text-xs text-gray-500 mt-1 ${isRTL ? "font-heebo text-right" : ""}`}>
                        {isRTL ? "התמונה נדחסה לחיסכון במקום" : "Image compressed to save space"}
                      </p>
                    </div>
                  )}

                  {/* Upload Options */}
                  <div className="space-y-3">
                    {/* File Upload Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={triggerFileUpload}
                      disabled={isUploading}
                      className={`w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 ${
                        isRTL ? "space-x-reverse font-heebo" : ""
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          <span>{isRTL ? "מעבד..." : "Processing..."}</span>
                        </>
                      ) : (
                        <>
                          <Camera size={20} className="text-gray-400" />
                          <span className="text-gray-600">
                            {isRTL ? "העלה תמונה (נדחס אוטומטית)" : "Upload Image (Auto-compressed)"}
                          </span>
                        </>
                      )}
                    </motion.button>

                    {/* URL Input */}
                    <div className={`text-center text-sm text-gray-500 ${isRTL ? "font-heebo" : ""}`}>
                      {isRTL ? "או" : "or"}
                    </div>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value })
                        setImagePreview(e.target.value)
                        setUploadError("")
                      }}
                      placeholder={isRTL ? "הדבק קישור לתמונה" : "Paste image URL"}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 ${
                        isRTL ? "text-right font-heebo" : ""
                      }`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isRTL ? "font-heebo text-right" : ""}`}>
                    {isRTL ? "קישור לאינסטגרם" : "Instagram URL"}
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder={isRTL ? "https://instagram.com/p/..." : "https://instagram.com/p/..."}
                    required
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 ${
                      isRTL ? "text-right font-heebo" : ""
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isRTL ? "font-heebo text-right" : ""}`}>
                    {isRTL ? "תיאור התמונה" : "Image Description"}
                  </label>
                  <input
                    type="text"
                    value={formData.alt}
                    onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                    placeholder={isRTL ? "תיאור התמונה..." : "Image description..."}
                    required
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 ${
                      isRTL ? "text-right font-heebo" : ""
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>

                <div className={`flex space-x-3 pt-4 ${isRTL ? "space-x-reverse" : ""}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!formData.image || isUploading}
                    className={`flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed ${
                      isRTL ? "font-heebo" : ""
                    }`}
                  >
                    {editingPost ? (isRTL ? "עדכן" : "Update") : isRTL ? "הוסף" : "Add"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleCancel}
                    className={`flex-1 btn-secondary ${isRTL ? "font-heebo" : ""}`}
                  >
                    {isRTL ? "ביטול" : "Cancel"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Password Change Modal */}
        <PasswordChangeModal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} />

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square relative">
                <Image src={post.image || "/placeholder.svg"} alt={post.alt} layout="fill" objectFit="cover" /> {/* Replaced img with Image */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(post)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-100"
                  >
                    <Edit3 size={16} />
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-100"
                  >
                    <ExternalLink size={16} />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removePost(post.id)}
                    className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
              <div className="p-4">
                <p className={`text-sm text-gray-600 line-clamp-2 ${isRTL ? "font-heebo text-right" : ""}`}>
                  {post.alt}
                </p>
                <p className={`text-xs text-gray-400 mt-2 ${isRTL ? "font-heebo text-right" : ""}`}>
                  {new Date(post.createdAt).toLocaleDateString(isRTL ? "he-IL" : "en-US")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className={`text-center py-12 ${isRTL ? "font-heebo" : ""}`}>
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">{isRTL ? "אין פוסטים עדיין" : "No posts yet"}</h3>
            <p className="text-gray-500">{isRTL ? "הוסף את הפוסט הראשון שלך" : "Add your first post to get started"}</p>
          </div>
        )}
      </div>
    </div>
  )
}
