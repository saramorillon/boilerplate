import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { SessionContext } from '../../contexts/SessionContext'
import { Footer } from './Footer'
import { Header } from './Header'

export function PublicOutlet(): JSX.Element {
  const session = useContext(SessionContext)
  if (session) return <Navigate to="/" />
  return (
    <>
      <main className="mx-auto flex-auto" style={{ minHeight: 'calc(100vh - 162px - 96px)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export function PrivateOutlet(): JSX.Element {
  const session = useContext(SessionContext)
  if (!session) return <Navigate to="/login" />
  return (
    <>
      <Header />
      <main className="mx-auto flex-auto" style={{ minHeight: 'calc(100vh - 162px - 96px - 55px)', minWidth: '60rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
