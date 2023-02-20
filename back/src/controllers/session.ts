import { createHash } from 'crypto'
import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../prisma'
import { settings } from '../settings'

const schema = {
  login: z.object({
    username: z.string(),
    password: z.string(),
  }),
}

export async function login(req: Request, res: Response): Promise<void> {
  const { success, failure } = req.logger.action('login')
  try {
    const { username, password } = schema.login.parse(req.body)
    const user = await prisma.user.findFirstOrThrow({
      where: { username, password: createHash('sha256').update(password).digest('hex') },
    })
    req.session.user = { username: user.username, createdAt: user.createdAt }
    success()
    res.sendStatus(204)
  } catch (error) {
    failure(error)
    res.sendStatus(401)
  }
}

export function getSession(req: Request, res: Response): void {
  const { success } = req.logger.action('get_session')
  res.json(req.session.user)
  success()
}

export function logout(req: Request, res: Response): void {
  const { success, failure } = req.logger.action('logout')
  req.session.destroy((err) => {
    if (err) failure(err)
    else success()
    res.clearCookie(settings.session.name).redirect(settings.app.host)
  })
}
