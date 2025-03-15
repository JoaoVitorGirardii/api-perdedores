import { ItemPerdidoDTO } from '../utils/dto/itemPerdido.dto'
import { ItemPerdidoModel } from '../models/itemPerdido.model'

export const ItemPerdidoRepository = {
    async CreateItemPerdido(itemPerdido: Omit<ItemPerdidoDTO, 'id'>): Promise<ItemPerdidoDTO> {
        return await ItemPerdidoModel.create(itemPerdido)
    },
    async GetItensPerdidos(): Promise<ItemPerdidoDTO[]> {
        return await ItemPerdidoModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },
    async GetItensByUsuarioId(usuarioId: string) {
        return await ItemPerdidoModel.findAll({
            where: {
                usuarioId,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },
}
