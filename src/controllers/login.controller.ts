import { Request, Response } from 'express'
import { gerarToken } from '../utils/authService'
import { UsuarioRepository } from '../repository/usuario.repository'
import { LoginAuthDTO } from '../utils/dto/loginAuth.dto'

class Login {
    async login(req: Request, res: Response) {
        const { usuario, senha } = req.body

        if (!usuario || !senha) {
            res.status(400).json({ msg: 'Usuário e/ou senha inválido.' })
        }

        const user = await UsuarioRepository.GetUsuarioLogin(usuario)

        if (!user) {
            res.status(400).json({ msg: 'Usuário e/ou senha inválido.' })
            return
        }

        if (user.senha !== senha) {
            res.status(400).json({ msg: 'Usuário e/ou senha inválido.' })
            return
        }

        if (!user.ativo) {
            res.status(400).json({ msg: 'Usuário desativado.' })
            return
        }

        delete user.senha

        const userResponse = {
            id: user.id,
            nome: user.nome,
            tipo: user.tipo,
            ativo: user.ativo,
        }

        const token = gerarToken(userResponse)

        res.status(200).json({ token, user: userResponse })
    }
}

export const LoginController = new Login()
