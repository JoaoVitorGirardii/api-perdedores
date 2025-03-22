import { Request, Response, NextFunction } from 'express'
import { PermissionENUM } from '../utils/enum/permission.enum'
import { verificarToken } from '../utils/authService'

export function permission(rolesPermitidas: PermissionENUM[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            res.status(401).json({ error: 'Token não fornecido' })
            return
        }

        const token = authHeader.split(' ')[1]

        try {
            const decoded = verificarToken(token)

            if (decoded.result) {
                if (!rolesPermitidas.includes(decoded.token.role)) {
                    res.status(403).json({ error: 'Acesso negado' })
                    return
                }
            } else {
                res.status(401).json({ error: 'Token inválido' })
                return
            }

            next()
        } catch (error) {
            res.status(401).json({ error: 'Token inválido ou expirado' })
            return
        }
    }
}
