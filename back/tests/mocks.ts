import { User } from '@prisma/client'
import { Logger } from '@saramorillon/logger'
import { NextFunction, Request, Response } from 'express'
import { Session, SessionData } from 'express-session'

export function getMockReq(request: Partial<Request> = {}): Request {
  return {
    params: {},
    query: {},
    body: {},
    session: {} as Session,
    logger: new Logger({ silent: true }),
    ...request,
  } as never
}

export function getMockRes(response: Partial<Response> = {}): { res: Response; next: NextFunction } {
  return {
    res: {
      send: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
      sendFile: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      clearCookie: vi.fn().mockReturnThis(),
      redirect: vi.fn().mockReturnThis(),
      ...response,
    } as never,
    next: vi.fn() as never,
  }
}

export function mockAction(logger: Logger) {
  const action = { success: vi.fn(), failure: vi.fn() }
  logger.start = vi.fn().mockReturnValue(action)
  return action
}

export function mockSession(session: Partial<SessionData['user']> = {}): SessionData['user'] {
  return {
    username: 'username',
    ...session,
  }
}

export function mockUser(user: Partial<User> = {}): User {
  return {
    id: 1,
    username: 'username',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...user,
  }
}
