import { Router } from 'express'
import { getApp } from '../../src/controllers/app'
import { getSession, login, logout } from '../../src/controllers/session'
import { session } from '../../src/middlewares/session'
import { routes } from '../../src/routes'

jest.mock('express')
jest.mock('../../src/controllers/app')
jest.mock('../../src/controllers/session')
jest.mock('../../src/middlewares/session')

function mockRouter() {
  return {
    get: jest.fn(),
    post: jest.fn(),
    use: jest.fn(),
  } as unknown as Router
}

describe('routes', () => {
  beforeEach(() => {
    jest.mocked(Router).mockReturnValue(mockRouter())
  })

  it('should create routes', () => {
    const router = routes()
    expect(router.post).toHaveBeenCalledWith('/login', login)
    expect(router.get).toHaveBeenCalledWith('/app', getApp)
    expect(router.use).toHaveBeenCalledWith(session)
    expect(router.get).toHaveBeenCalledWith('/session', getSession)
    expect(router.get).toHaveBeenCalledWith('/logout', logout)
  })

  it('should return router', () => {
    const routerMock = mockRouter()
    jest.mocked(Router).mockReturnValue(routerMock)
    const router = routes()
    expect(router).toBe(routerMock)
  })
})
