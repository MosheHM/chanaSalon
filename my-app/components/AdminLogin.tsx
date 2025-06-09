"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff } from "lucide-react"
import { useAdmin } from "@/contexts/AdminContext"
import { useLanguage } from "@/contexts/LanguageContext"
import HomeIcon from "./HomeIcon"
import AdminDebug from "./AdminDebug"

interface AdminLoginProps {
  onSuccess: () => void
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAdmin()
  const { isRTL } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (login(password)) {
      onSuccess()
    } else {
      setError(isRTL ? "סיסמה שגויה" : "Incorrect password")
    }
    setIsLoading(false)
  }

  const handleResetPassword = () => {
    if (
      window.confirm(
        isRTL
          ? "האם אתה בטוח שברצונך לאפס את הסיסמה לברירת המחדל?"
          : "Are you sure you want to reset the password to default?",
      )
    ) {
      localStorage.removeItem("salon_sano_password")
      localStorage.removeItem("salon_sano_auth")
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Home Icon */}
      <HomeIcon position="top-left" variant="button" showText />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className={`text-center mb-8 ${isRTL ? "font-heebo" : ""}`}>
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{isRTL ? "כניסת מנהל" : "Admin Login"}</h1>
          <p className="text-gray-600">
            {isRTL ? "הזן סיסמה לגישה למערכת הניהול" : "Enter password to access admin panel"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRTL ? "סיסמה" : "Password"}
              required
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 ${
                isRTL ? "text-right font-heebo" : ""
              }`}
              dir={isRTL ? "rtl" : "ltr"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 ${
                isRTL ? "left-3" : "right-3"
              }`}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-red-500 text-sm text-center ${isRTL ? "font-heebo" : ""}`}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed ${
              isRTL ? "font-heebo" : ""
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{isRTL ? "מתחבר..." : "Logging in..."}</span>
              </div>
            ) : (
              <span>{isRTL ? "התחבר" : "Login"}</span>
            )}
          </motion.button>

          <div className={`mt-4 text-center ${isRTL ? "font-heebo" : ""}`}>
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              {isRTL ? "אפס סיסמה לברירת מחדל" : "Reset to default password"}
            </button>
          </div>
        </form>

        <div className={`mt-6 text-center text-sm text-gray-500 ${isRTL ? "font-heebo" : ""}`}>
          <p>{isRTL ? "סיסמת ברירת מחדל: salon2024" : "Default password: salon2024"}</p>
        </div>
      </motion.div>
      {process.env.NODE_ENV === "development" && <AdminDebug />}
    </div>
  )
}
