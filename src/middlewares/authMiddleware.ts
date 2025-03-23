import { NextFunction, Request, Response } from 'express'
import { verificarToken } from '../utils/authService'

const HASH_HEADER = process.env.HASH_HEADER as string

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('HASH_HEADER: ', HASH_HEADER)
    const path = req?.originalUrl
    const method = req.method
    const appSource = req.headers['x-app-source']
    const rotasSemAutenticacao = ['/api/login']

    if (appSource !== HASH_HEADER) {
        res.status(403).json({
            error: 'Acesso não autorizado',
        })
        return
    }

    //rostas que não precisam de autenticação
    if (rotasSemAutenticacao.includes(path)) {
        next()
        return
    }

    //rota liberada para usuários se cadastrarem
    if (path === '/api/usuario' && method === 'POST') {
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
