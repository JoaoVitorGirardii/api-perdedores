import { NextFunction, Request, Response } from 'express'
import { verificarToken } from '../utils/authService'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const path = req?.originalUrl

    if (path === '/api/login') {
        next()
        return
    }

    const authorization = req?.headers?.authorization
    const token = authorization?.split(' ')[1]

    if (!token) {
        res.status(401).json({ error: 'Usuário não autenticado' })
        return
    }

    const tokenDescript = verificarToken(token)

    if (!tokenDescript.result) {
        res.status(401).json({ error: tokenDescript.token })
        return
    }

    next()
}
