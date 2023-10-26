import AppRoutes from './Routes'
import { ConfigProvider, theme } from 'antd'

import { AdminAuthProvider } from './contexts/AdminAuthContext'
import { AdminProvider } from './contexts/AdminContext'

function App() {
  return (
    <AdminAuthProvider>
      <AdminProvider>
        <AppThemed />
      </AdminProvider>
    </AdminAuthProvider>
  )
}

export default App

const AppThemed = () => {
  // const { adminTheme } = useAdmin()

  // const themeSelected = useMemo(() => {
  //   return adminTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  // }, [adminTheme])

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#FF7A00'
        }
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  )
}
