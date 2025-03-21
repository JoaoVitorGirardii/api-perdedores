import { Request, Response } from 'express'
import { ItemPerdidoRepository } from '../repository/itemPerdido.repository'
import { ItemPerdidoDTO } from '../utils/dto/itemPerdido.dto'

class ItemPerdido {
    async create(req: Request, res: Response) {
        try {
            const { categoriaId, nome, valor, dataPerca, descricao, usuarioId } = req.body
            const missingFields = []

            if (!categoriaId) missingFields.push('categoriaId')
            if (!nome) missingFields.push('nome')
            if (!valor) missingFields.push('valor')
            if (!dataPerca) missingFields.push('dataPerca')
            if (!descricao) missingFields.push('descricao')
            if (!usuarioId) missingFields.push('usuarioId')

            if (missingFields.length > 0) {
                res.status(400).json({
                    message: `Informe todos os campos! Campos faltando: ${missingFields.join(', ')}`,
                })
                return
            }

            const itemDTO: Omit<ItemPerdidoDTO, 'id'> = {
                categoriaId,
                nome,
                valor,
                dataPerca,
                descricao,
                usuarioId,
            }

            const itemPerdido = await ItemPerdidoRepository.CreateItemPerdido(itemDTO)

            res.status(201).json(itemPerdido)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
            return
        }
    }
    async listaTodosOsItens(req: Request, res: Response) {
        try {
            const itensPerdidos = await ItemPerdidoRepository.GetItensPerdidos()
            res.status(200).json(itensPerdidos)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
            return
        }
    }
    async listaItensUsuarioId(req: Request, res: Response) {
        try {
            const { usuarioId } = req.params

            if (!usuarioId) {
                res.status(400).json({ message: 'Informe um usuário!' })
                return
            }

            if (usuarioId) {
                const itensPerdidos = await ItemPerdidoRepository.GetItensByUsuarioId(usuarioId)
                res.status(200).json(itensPerdidos)
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message })
            return
        }
    }
    async update(req: Request, res: Response) {
        // code
    }
    async delete(req: Request, res: Response) {
        // code
    }
}

export const ItemPerdidoController = new ItemPerdido()
