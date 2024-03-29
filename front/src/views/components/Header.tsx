import { IconLogout } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'

export function Header(): JSX.Element {
  return (
    <nav aria-label="Main">
      <Link to="/">
        <img src="/favicon.svg" height={16} /> <strong>Boilerplate</strong>
      </Link>

      <a href="/api/logout" className="ml-auto">
        <IconLogout /> Log out
      </a>
    </nav>
  )
}
