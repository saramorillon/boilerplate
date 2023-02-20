import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SessionProvider } from '../contexts/SessionContext'
import { PrivateOutlet, PublicOutlet } from './components/Outlet'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

export function App(): JSX.Element | null {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicOutlet />}>
            <Route index element={<Login />} />
          </Route>

          <Route element={<PrivateOutlet />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}
