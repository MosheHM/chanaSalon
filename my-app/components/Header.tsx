"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, Globe, Home } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t, isRTL } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "he" ? "en" : "he")
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
    >
      <div className="container-max section-padding">
        <div className={`flex items-center justify-between h-20 ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo with Home Link */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="font-playfair text-2xl font-bold flex items-center space-x-3"
          >
            <div className="flex flex-col">
              <span>SALON</span>
              <span>
                SANO<span className="text-xs">®</span>
              </span>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 bg-black rounded-full flex items-center justify-center ml-2"
            >
              <Home size={16} className="text-white" />
            </motion.div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-8 ${isRTL ? "space-x-reverse" : ""}`}>
            <a href="/#about" className="hover:text-gray-600 transition-colors">
              {t("about" as any)}
            </a>
            <a href="/#services" className="hover:text-gray-600 transition-colors">
              {t("services" as any)}
            </a>
            <a href="/#gallery" className="hover:text-gray-600 transition-colors">
              {t("gallery" as any)}
            </a>
            <a href="/#contact" className="hover:text-gray-600 transition-colors">
              {t("contact" as any)}
            </a>
          </nav>

          {/* Right side buttons */}
          <div className={`flex items-center space-x-4 ${isRTL ? "space-x-reverse" : ""}`}>
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm"
            >
              <Globe size={16} />
              <span>{language === "he" ? "EN" : "עב"}</span>
            </motion.button>

            {/* Book Session Button */}
            <motion.a
              href="/#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block btn-primary text-sm"
            >
              {t("bookYourSession" as any)}
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 py-4"
          >
            <nav className="flex flex-col space-y-4">
              <a href="/#about" className="hover:text-gray-600 transition-colors">
                {t("about" as any)}
              </a>
              <a href="/#services" className="hover:text-gray-600 transition-colors">
                {t("services" as any)}
              </a>
              <a href="/#gallery" className="hover:text-gray-600 transition-colors">
                {t("gallery" as any)}
              </a>
              <a href="/#contact" className="hover:text-gray-600 transition-colors">
                {t("contact" as any)}
              </a>
              <a href="/#booking" className="btn-primary text-sm w-fit">
                {t("bookYourSession" as any)}
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
