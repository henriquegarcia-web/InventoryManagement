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

interface AdminContextData {
  inventoryList: IProduct[] | null
}

// ===================================================================

export const AdminContext = createContext<AdminContextData>(
  {} as AdminContextData
)

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [inventoryList, setInvetoryList] = useState<IProduct[] | null>(null)

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

  // =================================================================

  const AdminContextValues = useMemo(() => {
    return {
      inventoryList
    }
  }, [inventoryList])

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
