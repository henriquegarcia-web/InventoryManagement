/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

export type ThemeProps = 'default' | 'dark'

import { handleGetAllProducts } from '@/firebase/inventory'
import { IProduct } from '@/@types/Admin'
import {
  handleGetAllAuthenticatedUsers,
  handleGetAllUsers
} from '@/firebase/admin'
import { IAuthenticatedUser, IUserData } from '@/@types/Auth'

interface AdminContextData {
  inventoryList: IProduct[] | null
  authenticatedUsersList: IAuthenticatedUser[] | null
  usersList: IUserData[] | null
}

// ===================================================================

export const AdminContext = createContext<AdminContextData>(
  {} as AdminContextData
)

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [inventoryList, setInvetoryList] = useState<IProduct[] | null>(null)

  const [usersList, setUsersList] = useState<IUserData[] | null>(null)
  const [authenticatedUsersList, setAuthenticatedUsersList] = useState<
    IAuthenticatedUser[] | null
  >(null)

  useEffect(() => {
    const unsubscribe = handleGetAllProducts((productsList) => {
      setInvetoryList(productsList)
    })
    if (unsubscribe) {
      return () => {
        unsubscribe()
      }
    }
  }, [])

  useEffect(() => {
    const unsubscribe = handleGetAllAuthenticatedUsers((authenticatedUsers) => {
      setAuthenticatedUsersList(authenticatedUsers)
    })

    if (unsubscribe) {
      return () => {
        unsubscribe()
      }
    }
  }, [])

  useEffect(() => {
    const unsubscribe = handleGetAllUsers((users) => {
      setUsersList(users)
    })

    if (unsubscribe) {
      return () => {
        unsubscribe()
      }
    }
  }, [])

  // =================================================================

  const AdminContextValues = useMemo(() => {
    return {
      inventoryList,
      authenticatedUsersList,
      usersList
    }
  }, [inventoryList, authenticatedUsersList, usersList])

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
