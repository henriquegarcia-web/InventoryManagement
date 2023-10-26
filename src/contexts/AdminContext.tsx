/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useMemo, useState } from 'react'

export type ThemeProps = 'default' | 'dark'

interface AdminContextData {
  showPremiumAnnouncement: boolean
}

// ===================================================================

export const AdminContext = createContext<AdminContextData>(
  {} as AdminContextData
)

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [showPremiumAnnouncement, setShowPremiumAnnouncement] = useState(false)

  // =================================================================

  const AdminContextValues = useMemo(() => {
    return {
      showPremiumAnnouncement
    }
  }, [showPremiumAnnouncement])

  return (
    <AdminContext.Provider value={AdminContextValues}>
      {children}
    </AdminContext.Provider>
  )
}

function useAdmin(): AdminContextData {
  const context = useContext(AdminContext)

  if (!context) throw new Error('useAdmin must be used within a UserProvider')

  return context
}

export { AdminProvider, useAdmin }
