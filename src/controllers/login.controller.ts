import { Request, Response } from 'express'
import { gerarToken } from '../utils/authService'
import { UsuarioRepository } from '../repository/usuario.repository'
import { HashPass } from '../utils/hashPass'

class Login {
    async login(req: Request, res: Response) {
        const { usuario, senha } = req.body

        if (!usuario || !senha) {
            res.status(400).json({ error: 'Usuário e/ou senha não informado(s).' })
            return
        }

        const user = await UsuarioRepository.GetUsuarioLogin(usuario)

        if (!user) {
            res.status(400).json({ error: 'Usuário e/ou senha inválido.' })
            return
        }

        const senhaValida = await HashPass.checkPassword(user.senha || '', senha)

        if (!senhaValida) {
            res.status(400).json({ error: 'Usuário e/ou senha inválido.' })
            return
        }

        if (!user.ativo) {
            res.status(400).json({ error: 'Usuário desativado.' })
            return
        }

        delete user.senha

        const userToken: any = {
            id: user.id,
            nome: user.nome,
            tipo: user.tipo,
            ativo: user.ativo,
            role: user.rule,
        }

        const token = gerarToken(userToken)

        delete userToken.role
        delete userToken.ativo

        res.status(200).json({ token, user: userToken })
    }
}

export const LoginController = new Login()
