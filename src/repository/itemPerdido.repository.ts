import { ItemPerdidoDTO } from '../utils/dto/itemPerdido.dto'
import { ItemPerdidoModel } from '../models/itemPerdido.model'

export const ItemPerdidoRepository = {
    async CreateItemPerdido(itemPerdido: Omit<ItemPerdidoDTO, 'id'>): Promise<ItemPerdidoDTO> {
        const itemCriado = await ItemPerdidoModel.create(itemPerdido)

        //remove o create e o update
        const { createdAt, updatedAt, ...itemCriadoReturn } = itemCriado.toJSON()

        return itemCriadoReturn as ItemPerdidoDTO 
    },
    async GetItensPerdidos(): Promise<ItemPerdidoDTO[]> {
        return await ItemPerdidoModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },
    async GetItensByUsuarioId(usuarioId: string): Promise<ItemPerdidoDTO[]> {
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
