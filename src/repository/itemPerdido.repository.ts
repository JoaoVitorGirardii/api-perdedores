import { ItemPerdidoDTO } from '../utils/dto/itemPerdido.dto'
import { ItemPerdidoModel } from '../models/itemPerdido.model'
import sequelize from '../config/database'
import { TopDezPerdedores } from '../utils/dto/topDezPerdedores.dto'
import { TopDezDTO } from '../utils/dto/topDez.dto'

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
    async GetItensByUsuarioId(usuarioId: string, offSet?: number, limit?: number): Promise<ItemPerdidoDTO[]> {
        return await ItemPerdidoModel.findAll({
            where: {
                usuarioId,
            },
            order: [['createdAt', 'DESC']],
            offset: offSet,
            limit: limit,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
    },
    async TotalDeItensByUsuarioId(usuarioId: string): Promise<number> {
        return await ItemPerdidoModel.count({
            where: {
                usuarioId,
            },
        })
    },
    async TopDezUsuariosPerdedores(): Promise<TopDezPerdedores[]> {
        const sql = `
            SELECT COUNT(*) as quantidade, 
                   SUM(valor) as "valorTotal", 
                   u.nome as "nomeUsuario" 
              FROM itens_perdidos ip
              JOIN usuario u
                ON u.id = ip.usuario_id
             GROUP BY ip.usuario_id, u.nome
             ORDER BY quantidade desc
             LIMIT 10
        `

        const response = await sequelize.query(sql)

        return response[0] as TopDezPerdedores[]
    },
    async TopDezItensPerdidos({ homens = false, mulheres = false }): Promise<TopDezDTO[]> {
        let filtroHomemOuMulher = ''

        if (homens) {
            filtroHomemOuMulher = `WHERE u.sexo = 'MASCULINO'`
        }
        if (mulheres) {
            filtroHomemOuMulher = `WHERE u.sexo = 'FEMININO'`
        }

        const sql = `
            SELECT COUNT(*) as quantidade, 
                   SUM(valor) as "valorTotal",
				   ip.nome as "nomeItem",
				   COUNT(*) FILTER (WHERE u.sexo = 'FEMININO') as "totalFeminino",
                   COUNT(*) FILTER (WHERE u.sexo = 'MASCULINO') as "totalMasculino"
              FROM itens_perdidos ip
              JOIN usuario u
                ON u.id = ip.usuario_id
            ${filtroHomemOuMulher}
             GROUP BY ip.nome
             ORDER BY quantidade desc
             LIMIT 10
        `
        const response = await sequelize.query(sql)
        return response[0] as TopDezDTO[]
    },
}
