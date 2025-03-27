import { Request, Response } from 'express'
import { UsuarioRepository } from '../repository/usuario.repository'
import { TipoUsuarioENUM } from '../utils/enum/tipoUsuario.enum'
import { QueryPagination } from '../utils/dto/queryPagination.dto'
import { PermissionENUM } from '../utils/enum/permission.enum'
import { SexoENUM } from '../utils/enum/sexo.enum'

class Usuario {
    async createAdmin(req: Request, res: Response) {
        try {
            const { nome, usuario, sexo } = req.body

            if (!nome || !usuario) {
                res.status(400).json({ error: 'Preencha todos os dados para se cadastrar!' })
                return
            }

            if (!Object.values(SexoENUM).includes(sexo)) {
                res.status(400).json({ error: 'Sexo inválido!' })
                return
            }

            const user = {
                nome,
                tipo: TipoUsuarioENUM.ADMIN,
                ativo: true,
                sexo: sexo as SexoENUM,
                senha: 'senhaBYadmin',
                usuario,
                rule: PermissionENUM.ADMINISTRADOR,
            }

            await UsuarioRepository.CreateUsuario(user)

            res.status(201).json({ msg: 'Usuário cadastrado com sucesso.', nome })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário!' })
            return
        }
    }

    async createUsuario(req: Request, res: Response) {
        try {
            const { nome, usuario, senha, sexo } = req.body

            if (!nome || !senha || !usuario) {
                res.status(400).json({ error: 'Preencha todos os dados para se cadastrar!' })
                return
            }

            if (!Object.values(SexoENUM).includes(sexo)) {
                res.status(400).json({ error: 'Sexo inválido!' })
                return
            }

            const user = {
                nome,
                tipo: TipoUsuarioENUM.USER,
                ativo: true,
                senha,
                sexo: sexo as SexoENUM,
                usuario,
                rule: PermissionENUM.USUARIO,
            }

            await UsuarioRepository.CreateUsuario(user)

            res.status(201).json({ msg: 'Usuário cadastrado com sucesso.', nome })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário!' })
            return
        }
    }

    async listaTodosOsUsuario(req: Request, res: Response) {
        try {
            const { offSet, limit } = req.query as QueryPagination

            const itensPerdidos = await UsuarioRepository.GetUsuarios(offSet, limit)

            res.status(200).json(itensPerdidos)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    async getUsuarioById(req: Request, res: Response) {
        try {
            const { usuarioId } = req.params

            if (!usuarioId) {
                res.status(400).json({ message: 'Informe um usuario!' })
                return
            }

            if (usuarioId) {
                const usuario = await UsuarioRepository.GetUsuarioById(usuarioId)
                res.status(200).json(usuario)
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message })
            return
        }
    }
}

export const UsuarioController = new Usuario()
