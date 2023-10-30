import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AdminPage, AdminSigninPage, NotFoundPage } from './pages'

import { useAdminAuth } from './contexts/AdminAuthContext'

const AppRoutes = () => {
  const { isAdminLogged } = useAdminAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* =============================================================== */}

        <Route path="/" element={<AdminSigninPage />} />
        {/* <Route path="/*" element={<Navigate to="/" />} /> */}

        {/* =============================================================== */}

        <Route
          path="/admin/entrar"
          element={
            <PublicRoute isAuthenticated={isAdminLogged}>
              <AdminSigninPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute isAuthenticated={isAdminLogged}>
              <AdminPage />
            </PrivateAdminRoute>
          }
        />

        {/* =============================================================== */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

// =========================================== ROUTES

interface RouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}

const PrivateAdminRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/entrar" replace />
  }

  return children
}

const PublicRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (isAuthenticated) {
    return <Navigate to="/admin" />
  }

  return children
}
