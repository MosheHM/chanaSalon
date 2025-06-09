"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Calendar, Clock, User, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function BookingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  })
  const { t, isRTL } = useLanguage()

  const services = [
    t("keratinTreatment"),
    t("hairStraightening"),
    t("deepConditioning"),
    t("consultation"),
    t("touchUpSession"),
  ]

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
    // Here you would typically send the data to your API
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="booking" ref={ref} className="py-24 bg-white">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`text-center mb-16 ${isRTL ? "font-heebo" : ""}`}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-light mb-4">{t("bookYourSessionTitle")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("bookingSubtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {!showConfirmation ? (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 space-y-6">
              {/* Name and Contact Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <User
                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
                    size={20}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder={t("fullName")}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 ${
                      isRTL ? "pr-12 pl-4 text-right font-heebo" : "pl-12 pr-4"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
                <div className="relative">
                  <Phone
                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
                    size={20}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t("phoneNumber")}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 ${
                      isRTL ? "pr-12 pl-4 text-right font-heebo" : "pl-12 pr-4"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <Mail
                  className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t("emailAddress")}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 ${
                    isRTL ? "pr-12 pl-4 text-right font-heebo" : "pl-12 pr-4"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>

              {/* Service Selection */}
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 ${
                    isRTL ? "text-right font-heebo" : ""
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <option value="">{t("selectService")}</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Calendar
                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
                    size={20}
                  />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 ${
                      isRTL ? "pr-12 pl-4 text-right font-heebo" : "pl-12 pr-4"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
                <div className="relative">
                  <Clock
                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
                    size={20}
                  />
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className={`w-full py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 ${
                      isRTL ? "pr-12 pl-4 text-right font-heebo" : "pl-12 pr-4"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <option value="">{t("selectTime")}</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full btn-primary text-lg py-4 ${isRTL ? "font-heebo" : ""}`}
              >
                {t("bookYourSession")}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={`font-playfair text-2xl font-light mb-4 ${isRTL ? "font-heebo" : ""}`}>
                {t("bookingConfirmed")}
              </h3>
              <p className={`text-gray-600 mb-6 ${isRTL ? "font-heebo text-right" : ""}`}>
                {t("confirmationMessage")
                  .replace("{name}", formData.name)
                  .replace("{service}", formData.service)
                  .replace("{date}", formData.date)
                  .replace("{time}", formData.time)}
              </p>
              <button
                onClick={() => setShowConfirmation(false)}
                className={`btn-secondary ${isRTL ? "font-heebo" : ""}`}
              >
                {t("bookAnotherSession")}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
