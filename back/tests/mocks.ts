import { getMockReq as _getMockReq } from '@jest-mock/express'
import { User } from '@prisma/client'
import { Logger } from '@saramorillon/logger'
import { Session } from 'express-session'

export function getMockReq(...params: Parameters<typeof _getMockReq>): ReturnType<typeof _getMockReq> {
  const req = _getMockReq(...params)
  req.session = {} as Session
  req.logger = new Logger({ silent: true })
  mockAction(req.logger)
  return req
}

export function mockAction(logger: Logger) {
  const action = { success: jest.fn(), failure: jest.fn() }
  logger.action = jest.fn().mockReturnValue(action)
  return action
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
