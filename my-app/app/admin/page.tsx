"use client"

import { useState, useEffect } from "react"
import AdminLogin from "@/components/AdminLogin"
import AdminDashboard from "@/components/AdminDashboard"
import { useAdmin, AdminProvider } from "@/contexts/AdminContext"
import { LanguageProvider } from "@/contexts/LanguageContext" // Import LanguageProvider

export default function AdminPage() {
  return (
    <AdminProvider>
      <LanguageProvider> {/* Add LanguageProvider here */}
        <AdminContent />
      </LanguageProvider>
    </AdminProvider>
  )
}

// Create a new component for the original content to use the context
function AdminContent() {
  const { isAuthenticated } = useAdmin()
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    setShowDashboard(isAuthenticated)
  }, [isAuthenticated])

  if (showDashboard) {
    return <AdminDashboard />
  }

  return <AdminLogin onSuccess={() => setShowDashboard(true)} />
}
