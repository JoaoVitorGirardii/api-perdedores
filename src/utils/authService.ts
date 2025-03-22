import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { LoginAuthDTO } from './dto/loginAuth.dto'

type VerificaTokenResponse = {
    result: boolean
    token: any
}

const SECRET_KEY = process.env.SECRET_KEY_JWT as string

export function gerarToken(payload: LoginAuthDTO) {
    if (!SECRET_KEY) {
        throw new Error('Erro ao gerar autenticação')
    }
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '5d' })
}

export function verificarToken(token: string): VerificaTokenResponse {
    try {
        if (!SECRET_KEY) {
            throw new Error('Erro ao gerar autenticação')
        }
        const tokenResponse = jwt.verify(token, SECRET_KEY)
        return { result: true, token: tokenResponse }
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            if (error.name === 'TokenExpiredError') {
                return { result: false, token: 'Token expirado!' }
            }
        }
        return { result: false, token: 'Token inválido' }
    }
}
