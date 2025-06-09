"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function HeroSection() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full opacity-15"
        />
      </div>

      <div className="container-max section-padding relative z-10">
        <div className={`text-center max-w-4xl mx-auto ${isRTL ? "font-heebo" : ""}`}>
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-playfair text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-8"
          >
            {t("heroTitle")}
            <br />
            <span className="italic">{t("heroTitleItalic")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 font-light"
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* Hair Strand Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="relative my-16"
          >
            <div className="w-full max-w-md mx-auto h-64 relative">
              <svg
                viewBox="0 0 400 200"
                className="w-full h-full float-animation"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D2B48C" />
                    <stop offset="50%" stopColor="#CD853F" />
                    <stop offset="100%" stopColor="#A0522D" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 150 Q150 50 250 100 Q350 150 380 80"
                  stroke="url(#hairGradient)"
                  strokeWidth="40"
                  strokeLinecap="round"
                  fill="none"
                  className="drop-shadow-lg"
                />
              </svg>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <a href="#booking" className="btn-primary text-lg">
              {t("bookYourSession")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <ChevronDown size={24} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
