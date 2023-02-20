import { getMockReq, getMockRes } from '@jest-mock/express'
import { Logger } from '@saramorillon/logger'
import { z } from 'zod'
import { errorParser, logger } from '../../../src/middlewares/logger'

jest.mock('@saramorillon/logger')

describe('errorParser', () => {
  it('should return undefined if error is undefined', () => {
    expect(errorParser()).toBeUndefined()
  })

  it('should return undefined if error is null', () => {
    expect(errorParser(null)).toBeUndefined()
  })

  it('should return message and stack if error is a native error', () => {
    expect(errorParser(new Error('message'))).toEqual({
      message: 'message',
      stack: expect.stringContaining('Error: message'),
    })
  })

  it('should return formatted error message and stack if error is a zod error', () => {
    const schema = z.object({ id: z.string() })
    const result = schema.safeParse({ id: 1 })
    const error = result.success ? false : errorParser(result.error)
    expect(error).toEqual({
      message: 'id: Expected string, received number',
      stack: expect.stringContaining('Expected string, received number'),
    })
  })

  it('should return error as message if error is not an object', () => {
    expect(errorParser('message')).toEqual({ message: 'message' })
  })

  it('should return inspected error as message if error is an object', () => {
    expect(errorParser({ prop: 'value' })).toEqual({ error: "{ prop: 'value' }" })
  })
})

describe('logger', () => {
  it('should create req logger', () => {
    const req = getMockReq({ url: 'url', params: { param: 'value' }, query: { query: 'value' } })
    const { res, next } = getMockRes()
    logger(req, res, next)
    expect(Logger).toHaveBeenCalledWith(
      { silent: true, colors: false },
      {
        app: { host: 'http://app_host.io', name: 'boilerplate', port: 3000, version: expect.any(String) },
        req: { url: 'url', params: { param: 'value' }, query: { query: 'value' } },
      }
    )
    expect(req.logger).toBeInstanceOf(Logger)
  })

  it('should add error parser', () => {
    const req = getMockReq()
    const { res, next } = getMockRes()
    logger(req, res, next)
    expect(req.logger.setParser).toHaveBeenCalledWith('error', errorParser)
  })

  it('should go next', () => {
    const req = getMockReq()
    const { res, next } = getMockRes()
    logger(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
