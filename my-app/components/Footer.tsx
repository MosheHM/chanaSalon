"use client"

import { motion } from "framer-motion"
import { Instagram, MessageCircle, MapPin, Phone, Mail, Settings } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Footer() {
  const { t, isRTL } = useLanguage()

  return (
    <footer className="bg-black text-white py-16">
      <div className="container-max section-padding">
        <div className={`grid md:grid-cols-4 gap-8 mb-12 ${isRTL ? "text-right" : ""}`}>
          {/* Logo & Tagline */}
          <div>
            <motion.div whileHover={{ scale: 1.05 }} className="font-playfair text-2xl font-bold mb-4">
              SALON
              <br />
              SANO<span className="text-xs">®</span>
            </motion.div>
            <p className={`text-gray-400 text-sm leading-relaxed ${isRTL ? "font-heebo" : ""}`}>
              {t("footerTagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`font-semibold mb-4 ${isRTL ? "font-heebo" : ""}`}>{t("navigation")}</h4>
            <nav className="space-y-2">
              <a
                href="#about"
                className={`block text-gray-400 hover:text-white transition-colors ${isRTL ? "font-heebo" : ""}`}
              >
                {t("about")}
              </a>
              <a
                href="#services"
                className={`block text-gray-400 hover:text-white transition-colors ${isRTL ? "font-heebo" : ""}`}
              >
                {t("services")}
              </a>
              <a
                href="#gallery"
                className={`block text-gray-400 hover:text-white transition-colors ${isRTL ? "font-heebo" : ""}`}
              >
                {t("gallery")}
              </a>
              <a
                href="#booking"
                className={`block text-gray-400 hover:text-white transition-colors ${isRTL ? "font-heebo" : ""}`}
              >
                {t("bookYourSession")}
              </a>
              <a
                href="/admin"
                className={`flex items-center space-x-2 text-gray-400 hover:text-white transition-colors ${
                  isRTL ? "space-x-reverse font-heebo" : ""
                }`}
              >
                <Settings size={16} />
                <span>{isRTL ? "ניהול" : "Admin"}</span>
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-semibold mb-4 ${isRTL ? "font-heebo" : ""}`}>{t("contactInfo")}</h4>
            <div className="space-y-3 text-sm">
              <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                <MapPin size={16} className="text-gray-400" />
                <span className={`text-gray-400 ${isRTL ? "font-heebo" : ""}`}>{t("address")}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-400">{t("phone")}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-400">{t("email")}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className={`font-semibold mb-4 ${isRTL ? "font-heebo" : ""}`}>{t("followUs")}</h4>
            <div className={`flex space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com/salonsano"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/972501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <MessageCircle size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-gray-800 pt-8 text-center ${isRTL ? "font-heebo" : ""}`}>
          <p className="text-gray-400 text-sm">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
