import { Request, Response } from 'express'
import { ItemPerdidoRepository } from '../repository/itemPerdido.repository'
import { ItemPerdidoDTO } from '../utils/dto/itemPerdido.dto'
import { QueryPagination } from '../utils/dto/queryPagination.dto'
import { ListaTopDezENUM } from '../utils/enum/listaTopDez.enum'

class ItemPerdido {
    async create(req: Request, res: Response) {
        try {
            const { categoriaId, nome, valor, dataPerca, descricao, usuarioId } = req.body
            const missingFields = []

            if (!categoriaId) missingFields.push('categoriaId')
            if (!nome) missingFields.push('nome')
            if (!valor) missingFields.push('valor')
            if (!dataPerca) missingFields.push('dataPerca')
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
            const { offSet, limit } = req.query as QueryPagination

            if (!usuarioId) {
                res.status(400).json({ message: 'Informe um usuário!' })
                return
            }

            const itensPerdidos = await ItemPerdidoRepository.GetItensByUsuarioId(usuarioId, offSet, limit)
            const totalItens = await ItemPerdidoRepository.TotalDeItensByUsuarioId(usuarioId)
            const totalDeFinanceiro = itensPerdidos.reduce((total, item) => Number(item.valor) + total, 0)

            res.status(200).json({ data: { itensPerdidos, totalDeFinanceiro }, total: totalItens })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
            return
        }
    }
    async topDezPessoasPerdedoras(req: Request, res: Response) {
        const itens = await ItemPerdidoRepository.TopDezUsuariosPerdedores()

        res.status(200).json({ itens })
    }
    async topDez(req: Request, res: Response) {
        const { type } = req.query as { type: any }
        console.log(type)

        if (!Object.values(ListaTopDezENUM).includes(type)) {
            res.status(400).json({ error: 'tipo de lista inválido!' })
            return
        }

        const tipoSelecionado = type as ListaTopDezENUM

        let itens

        switch (tipoSelecionado) {
            case ListaTopDezENUM.ITENS_MAIS_PERDIDOS:
                itens = await ItemPerdidoRepository.TopDezItensPerdidos({})
                break
            case ListaTopDezENUM.ITENS_MAIS_PERDIDOS_HOMEM:
                itens = await ItemPerdidoRepository.TopDezItensPerdidos({ homens: true })
                break
            case ListaTopDezENUM.ITENS_MAIS_PERDIDOS_MULHERES:
                itens = await ItemPerdidoRepository.TopDezItensPerdidos({ mulheres: true })
                break
            case ListaTopDezENUM.ITENS_MAIS_PERDIDOS_MES:
                //itens = await ItemPerdidoRepository.TopDezItensPerdidos()
                break
            case ListaTopDezENUM.ITENS_MAIS_PERDIDOS_SEMANA:
                //itens = await ItemPerdidoRepository.TopDezItensPerdidos()
                break
            default:
                break
        }

        res.status(200).json({ itens })
        return
    }
}

export const ItemPerdidoController = new ItemPerdido()
