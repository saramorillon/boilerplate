import { Logger } from '@saramorillon/logger'
import { NextFunction, Request, Response } from 'express'
import { inspect } from 'util'
import { isNativeError } from 'util/types'
import { ZodError } from 'zod'
import { settings } from '../settings'

export function errorParser(error?: unknown): Record<string, unknown> | undefined {
  if (!error) {
    return
  }

  if (error instanceof ZodError) {
    return {
      message: error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('\n'),
      stack: error.stack,
    }
  }

  if (isNativeError(error)) {
    return {
      message: error.message,
      stack: error.stack,
    }
  }

  if (typeof error !== 'object') {
    return {
      message: error,
    }
  }

  return {
    error: inspect(error),
  }
}

export function logger(req: Request, res: Response, next: NextFunction): void {
  const { url, params, query } = req
  req.logger = new Logger(settings.logs, { app: settings.app, req: { url, params, query } })
  req.logger.setParser('error', errorParser)
  next()
}
