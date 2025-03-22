import jwt from 'jsonwebtoken'
import { LoginAuthDTO } from './dto/loginAuth.dto'

const SECRET_KEY = process.env.SECRET_KEY_JWT as string

export function gerarToken(payload: LoginAuthDTO) {
    if (!SECRET_KEY) {
        throw new Error('Erro ao gerar autenticação')
    }
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '10d', algorithm: 'HS512' })
}

export function verificarToken(token: string) {
    try {
        if (!SECRET_KEY) {
            throw new Error('Erro ao gerar autenticação')
        }
        return jwt.verify(token, SECRET_KEY, { algorithms: ['HS512'] })
    } catch (error) {
        return null
    }
}
