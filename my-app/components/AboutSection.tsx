"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Droplets, Users, Leaf } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, isRTL } = useLanguage()

  const advantages = [
    {
      icon: Droplets,
      title: t("keratinRichTitle" ),
      description: t("keratinRichDesc" ),
    },
    {
      icon: Users,
      title: t("expertStylistsTitle" ),
      description: t("expertStylistsDesc" ),
    },
    {
      icon: Leaf,
      title: t("sustainablySourcedTitle" ),
      description: t("sustainablySourcedDesc" ),
    },
  ]

  return (
    <section id="about" ref={ref} className="py-24 bg-white">
      <div className="container-max section-padding">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? "lg:grid-flow-col-dense" : ""}`}>
          {/* Left Column - Mission */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={isRTL ? "lg:col-start-2" : ""}
          >
            <h2 className={`font-playfair text-4xl md:text-5xl font-light mb-8 ${isRTL ? "text-right" : ""}`}>
              {t("ourPhilosophy" )}
            </h2>
            <div className={`space-y-6 text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right font-heebo" : ""}`}>
              <p>{t("aboutText1")}</p>
              <p>{t("aboutText2")}</p>
            </div>
          </motion.div>

          {/* Right Column - Advantages */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`space-y-8 ${isRTL ? "lg:col-start-1" : ""}`}
          >
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className={`flex items-start space-x-4 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ${
                  isRTL ? "flex-row-reverse space-x-reverse text-right" : ""
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <advantage.icon size={24} className="text-white" />
                </div>
                <div className={isRTL ? "font-heebo" : ""}>
                  <h3 className="font-semibold text-xl mb-2">{advantage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
