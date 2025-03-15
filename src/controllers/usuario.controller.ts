import { Request, Response } from 'express'
import { UsuarioRepository } from '../repository/usuario.repository'
import { TipoUsuarioDTO } from '../utils/enum/tipoUsuario.enum'

class Usuario {
    async create(req: Request, res: Response) {
        try {
            const { nome, tipo } = req.body

            if (!nome || !tipo) {
                res.status(400).json({ message: 'Informe todos os campos!' })
                return
            }

            const user = {
                nome,
                tipo: tipo as TipoUsuarioDTO,
            }

            const usuarioCriado = await UsuarioRepository.CreateUsuario(user)
            res.status(201).json(usuarioCriado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário!' })
            return
        }
    }

    async listaTodosOsUsuario(req: Request, res: Response) {
        try {
            const itensPerdidos = await UsuarioRepository.GetUsuarios()
            res.status(200).json(itensPerdidos)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    async getUsuarioById(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (!id) {
                res.status(400).json({ message: 'Informe um usuario!' })
                return
            }

            if (id) {
                const usuario = await UsuarioRepository.GetUsuarioById(id)
                res.status(200).json(usuario)
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message })
            return
        }
    }
}

export const UsuarioController = new Usuario()
