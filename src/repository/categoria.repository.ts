import { CategoriaModel } from '../models/categoria.model'
import { CategoriaDTO } from '../utils/dto/categoria.dto'

export const CategoriaRepository = {
    async Create(novaCategoria: Omit<CategoriaDTO, 'id'>): Promise<CategoriaDTO> {
        const itemCriado = await CategoriaModel.create(novaCategoria)

        //remove o create e o update
        const { createdAt, updatedAt, ...itemCriadoReturn } = itemCriado.toJSON()

        return itemCriadoReturn as CategoriaDTO
    },
    async GetCategorias(): Promise<CategoriaDTO[]> {
        return await CategoriaModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },
}
