"use client"

import { useState, useEffect } from "react"
import AdminLogin from "@/components/AdminLogin"
import AdminDashboard from "@/components/AdminDashboard"
import { useAdmin } from "@/contexts/AdminContext"

export default function AdminPage() {
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
