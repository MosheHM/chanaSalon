"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Instagram, MessageCircle, X } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAdmin } from "@/contexts/AdminContext"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function InstagramGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [comment, setComment] = useState("")
  const { t, isRTL } = useLanguage()
  const { posts } = useAdmin()

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(t("whatsappMessage" as any).replace("{comment}", comment))
    window.open(`https://wa.me/972501234567?text=${message}`, "_blank")
  }

  return (
    <section id="gallery" ref={ref} className="py-24 bg-gray-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`text-center mb-16 ${isRTL ? "font-heebo" : ""}`}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-light mb-4">{t("ourLatestWork" as any)}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("instagramSubtitle" as any)}</p>
        </motion.div>

        {/* Instagram Gallery */}
        {posts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="instagram-swiper"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {posts.map((post, index) => (
                <SwiperSlide key={post.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                      <Instagram size={32} className="text-white" />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <div className={`text-center py-12 ${isRTL ? "font-heebo" : ""}`}>
            <Instagram size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {isRTL ? "אין פוסטים להצגה" : "No posts to display"}
            </h3>
            <p className="text-gray-500">{isRTL ? "פוסטים יתווספו בקרוב" : "Posts will be added soon"}</p>
          </div>
        )}

        {/* Feedback Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className={`font-playfair text-3xl font-light text-center mb-8 ${isRTL ? "font-heebo" : ""}`}>
            {t("shareYourThoughts" as any)}
          </h3>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("commentPlaceholder" as any)}
              className={`w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black/20 ${
                isRTL ? "text-right font-heebo" : ""
              }`}
              dir={isRTL ? "rtl" : "ltr"}
            />
            <div className="flex justify-center mt-6">
              <button
                onClick={handleWhatsAppShare}
                className={`btn-primary flex items-center space-x-2 ${isRTL ? "space-x-reverse font-heebo" : ""}`}
              >
                <MessageCircle size={20} />
                <span>{t("sendViaWhatsApp" as any)}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && posts[selectedImage] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className={`absolute -top-12 text-white hover:text-gray-300 ${isRTL ? "left-0" : "right-0"}`}
            >
              <X size={32} />
            </button>
            <img
              src={posts[selectedImage].image || "/placeholder.svg"}
              alt={posts[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <a
              href={posts[selectedImage].url}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute bottom-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-white/30 transition-colors ${
                isRTL ? "left-4 space-x-reverse font-heebo" : "right-4"
              }`}
            >
              <Instagram size={20} />
              <span>{t("viewOnInstagram" as any)}</span>
            </a>
          </div>
        </motion.div>
      )}
    </section>
  )
}
