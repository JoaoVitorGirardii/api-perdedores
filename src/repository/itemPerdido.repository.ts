import { ItemPerdidoDTO } from '../dto/itemPerdido.dto'
import { ItemPerdidoModel } from '../models/itemPerdido.model'

export const ItemPerdidoRepository = {
    async GetItensPerdidos(): Promise<ItemPerdidoDTO[]> {
        return await ItemPerdidoModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },
    async CreateItemPerdido(itemPerdido: Omit<ItemPerdidoDTO, 'id'>): Promise<ItemPerdidoDTO> {
        return await ItemPerdidoModel.create(itemPerdido)
    },
}
