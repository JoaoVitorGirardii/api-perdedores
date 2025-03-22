import { NextFunction, Request, Response } from 'express'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const path = req?.originalUrl

    if (path === '/api/login') {
        next()
        return
    }

    const authorization = req?.headers?.authorization
    const token = authorization?.split(' ')[1]

    if (!token) {
        res.status(401).json('Usuário não autenticado')
        return
    }

    next()
}
