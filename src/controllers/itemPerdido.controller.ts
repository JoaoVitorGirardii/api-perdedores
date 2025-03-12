import { Request, Response } from 'express'
import { ItemPerdidoRepository } from '../repository/itemPerdido.repository'

class ItemPerdido {
    async create(req: Request, res: Response) {
        try {
            const { item, nome, valor, data_perca, descricao, usuario_id } = req.body
            if (!item || !nome || !valor || !data_perca || !descricao || !usuario_id) {
                res.status(400).json({ message: 'Informe todos os campos!' })
                return
            }

            const itemDTO = {
                item,
                nome,
                valor,
                data_perca,
                descricao,
                usuario_id,
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
    async show(req: Request, res: Response) {
        // code
    }
    async update(req: Request, res: Response) {
        // code
    }
    async delete(req: Request, res: Response) {
        // code
    }
}

export const ItemPerdidoController = new ItemPerdido()
