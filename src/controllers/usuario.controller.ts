import { Request, Response } from 'express'
import { UsuarioRepository } from '../repository/usuario.repository'
import { TipoUsuarioENUM } from '../utils/enum/tipoUsuario.enum'
import { QueryPagination } from '../utils/dto/queryPagination.dto'

class Usuario {
    async create(req: Request, res: Response) {
        try {
            const { nome, tipo, ativo, usuario } = req.body

            if (!nome || !tipo || !ativo || !usuario) {
                res.status(400).json({ message: 'Informe todos os campos!' })
                return
            }

            const user = {
                nome,
                tipo: tipo as TipoUsuarioENUM,
                ativo: Boolean(ativo),
                senha: 'abc@123',
                usuario,
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
