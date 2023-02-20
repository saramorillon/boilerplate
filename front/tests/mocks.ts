import { act } from 'react-dom/test-utils'
import { useNavigate } from 'react-router-dom'
import { IApp } from '../src/models/App'
import { ISession } from '../src/models/Session'

export async function wait() {
  await act(() => new Promise((resolve) => setTimeout(resolve, 0)))
}

const { location } = window

export function mockLocation(fns: Partial<Location>): void {
  Object.defineProperty(window, 'location', { value: { ...location, ...fns }, writable: false })
}

export function restoreLocation(): void {
  Object.defineProperty(window, 'location', { value: location, writable: false })
}

export function mockNavigate(): jest.Mock {
  const navigate = jest.fn()
  jest.mocked(useNavigate).mockReturnValue(navigate)
  return navigate
}

export function mockSession(session: Partial<ISession> = {}): ISession {
  return {
    username: 'username',
    ...session,
  }
}

export function mockApp(app: Partial<IApp> = {}): IApp {
  return {
    name: 'name',
    version: 'version',
    author: {
      name: 'author name',
      url: 'author url',
    },
    repository: {
      url: 'repository url',
    },
    ...app,
  }
}
