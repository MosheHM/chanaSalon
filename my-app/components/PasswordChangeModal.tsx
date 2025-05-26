"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Eye, EyeOff, Lock } from "lucide-react"
import { useAdmin } from "@/contexts/AdminContext"
import { useLanguage } from "@/contexts/LanguageContext"

interface PasswordChangeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PasswordChangeModal({ isOpen, onClose }: PasswordChangeModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { changePassword } = useAdmin()
  const { t, isRTL } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (formData.newPassword !== formData.confirmPassword) {
      setError(isRTL ? "הסיסמאות החדשות אינן תואמות" : "New passwords don't match")
      setIsLoading(false)
      return
    }

    if (formData.newPassword.length < 6) {
      setError(isRTL ? "הסיסמה החדשה חייבת להכיל לפחות 6 תווים" : "New password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (changePassword(formData.currentPassword, formData.newPassword)) {
      setSuccess(true)
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 2000)
    } else {
      setError(isRTL ? "הסיסמה הנוכחית שגויה" : "Current password is incorrect")
    }
    setIsLoading(false)
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md"
      >
        <div className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center space-x-3 ${isRTL ? "space-x-reverse" : ""}`}>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Lock size={20} className="text-white" />
            </div>
            <h2 className={`text-xl font-bold ${isRTL ? "font-heebo" : ""}`}>
              {isRTL ? "שינוי סיסמה" : "Change Password"}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold text-green-600 mb-2 ${isRTL ? "font-heebo" : ""}`}>
              {isRTL ? "הסיסמה שונתה בהצלחה!" : "Password Changed Successfully!"}
            </h3>
            <p className={`text-gray-600 ${isRTL ? "font-heebo" : ""}`}>
              {isRTL ? "הסיסמה החדשה שלך נשמרה" : "Your new password has been saved"}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isRTL ? "font-heebo text-right" : ""}`}>
                {isRTL ? "סיסמה נוכחית" : "Current Password"}
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  required
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 ${
                    isRTL ? "text-right font-heebo pr-10" : "pr-10"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${
                    isRTL ? "left-3" : "right-3"
                  }`}
                >
                  {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isRTL ? "font-heebo text-right" : ""}`}>
                {isRTL ? "סיסמה חדשה" : "New Password"}
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  required
                  minLength={6}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 ${
                    isRTL ? "text-right font-heebo pr-10" : "pr-10"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${
                    isRTL ? "left-3" : "right-3"
                  }`}
                >
                  {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isRTL ? "font-heebo text-right" : ""}`}>
                {isRTL ? "אישור סיסמה חדשה" : "Confirm New Password"}
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 ${
                    isRTL ? "text-right font-heebo pr-10" : "pr-10"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${
                    isRTL ? "left-3" : "right-3"
                  }`}
                >
                  {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-red-500 text-sm ${isRTL ? "font-heebo text-right" : ""}`}
              >
                {error}
              </motion.div>
            )}

            <div className={`flex space-x-3 pt-4 ${isRTL ? "space-x-reverse" : ""}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRTL ? "font-heebo" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isRTL ? "משנה..." : "Changing..."}</span>
                  </div>
                ) : (
                  <span>{isRTL ? "שנה סיסמה" : "Change Password"}</span>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className={`flex-1 btn-secondary ${isRTL ? "font-heebo" : ""}`}
              >
                {isRTL ? "ביטול" : "Cancel"}
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}
