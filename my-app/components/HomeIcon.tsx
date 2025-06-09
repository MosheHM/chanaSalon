"use client"

import { motion } from "framer-motion"
import { Home, ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface HomeIconProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  showText?: boolean
  variant?: "icon" | "button" | "floating"
}

export default function HomeIcon({ position = "top-left", showText = false, variant = "floating" }: HomeIconProps) {
  const { isRTL } = useLanguage()

  const positionClasses = {
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "icon":
        return "w-12 h-12 bg-black text-white rounded-full shadow-lg hover:shadow-xl"
      case "button":
        return "px-4 py-2 bg-black text-white rounded-full shadow-lg hover:shadow-xl"
      case "floating":
        return "w-14 h-14 bg-black text-white rounded-full shadow-lg hover:shadow-xl border-2 border-white"
      default:
        return "w-12 h-12 bg-black text-white rounded-full shadow-lg hover:shadow-xl"
    }
  }

  return (
    <motion.a
      href="/"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed ${positionClasses[position]} z-50 flex items-center justify-center ${getVariantClasses()} transition-all duration-300`}
      title={isRTL ? "חזור לעמוד הבית" : "Return to Home"}
    >
      {showText ? (
        <div className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse font-heebo" : ""}`}>
          {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          <span className="text-sm font-medium">{isRTL ? "בית" : "Home"}</span>
        </div>
      ) : (
        <Home size={variant === "floating" ? 24 : 20} />
      )}
    </motion.a>
  )
}
