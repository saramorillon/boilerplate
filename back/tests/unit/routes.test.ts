import { Router } from 'express'
import { getApp } from '../../src/controllers/app'
import { getSession, login, logout } from '../../src/controllers/session'
import { session } from '../../src/middlewares/session'
import { routes } from '../../src/routes'

vi.mock('express')
vi.mock('../../src/controllers/app')
vi.mock('../../src/controllers/session')
vi.mock('../../src/middlewares/session')

function mockRouter() {
  return {
    get: vi.fn(),
    post: vi.fn(),
    use: vi.fn(),
  } as unknown as Router
}

describe('routes', () => {
  beforeEach(() => {
    vi.mocked(Router).mockReturnValue(mockRouter())
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
    vi.mocked(Router).mockReturnValue(routerMock)
    const router = routes()
    expect(router).toBe(routerMock)
  })
})
