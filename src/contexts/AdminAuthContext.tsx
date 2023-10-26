/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { message } from 'antd'

import firebase from '@/firebase/firebase'
// import {
//   handleGetAdminData,
//   handleLogoutAdmin
// } from '@/firebase/auth'

import { IUserData } from '@/@types/Auth'

interface AdminAuthContextData {
  userId: string | null
  userData: IUserData | null
  isAdminLogged: boolean

  handleLogout: () => void
}

// ===================================================================

export const AdminAuthContext = createContext<AdminAuthContextData>(
  {} as AdminAuthContextData
)

const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [userId, setUserId] = useState<string | null>(null)
  const [userData, setUserData] = useState<IUserData | null>(null)

  const isAdminLogged = useMemo(() => {
    return !!userId
  }, [userId])

  // -----------------------------------------------------------------

  const handleLogout = useCallback(async () => {
    // const response = await handleLogoutAdmin()
    // if (!response) return

    setUserId(null)
    setUserData(null)
  }, [])

  // -----------------------------------------------------------------

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (user: any) => {
        if (user) {
          const uid = user.uid
          setUserId(uid)
        } else {
          setUserId(null)
          setUserData(null)
          handleLogout()
        }
      })

    return () => unsubscribe()
  }, [handleLogout])

  useEffect(() => {
    // const unsubscribe = handleGetAdminData((accountData) => {
    //   setUserData(accountData)
    // })
    // if (unsubscribe) {
    //   return () => {
    //     unsubscribe()
    //   }
    // }
  }, [userId])

  // =================================================================

  const AdminAuthContextValues = useMemo(() => {
    return {
      userId,
      userData,
      isAdminLogged,
      handleLogout
    }
  }, [userId, userData, isAdminLogged, handleLogout])

  return (
    <AdminAuthContext.Provider value={AdminAuthContextValues}>
      {children}
    </AdminAuthContext.Provider>
  )
}

function useAdminAuth(): AdminAuthContextData {
  const context = useContext(AdminAuthContext)

  if (!context)
    throw new Error('useAdminAuth must be used within a UserProvider')

  return context
}

export { AdminAuthProvider, useAdminAuth }
