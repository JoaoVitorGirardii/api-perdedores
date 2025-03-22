import { UsuarioDTO } from '../utils/dto/usuario.dto'
import { UsuarioModel } from '../models/usuario.model'
import { Paginacao } from '../utils/dto/paginacao.dto'
import { error } from 'console'

export const UsuarioRepository = {
    async CreateUsuario(usuario: Omit<UsuarioDTO, 'id'>): Promise<UsuarioDTO> {
        console.log('chegou aqui')
        const usuarioCriado = await UsuarioModel.create(usuario)

        //remove o create e o update
        const { createdAt, updatedAt, ...usuarioReturn } = usuarioCriado.toJSON()

        return usuarioReturn as UsuarioDTO
    },
    async GetUsuarios(offSet?: number, limit?: number): Promise<Paginacao<UsuarioDTO[]>> {
        const usuarios = await UsuarioModel.findAll({
            // attributes: {
            //     exclude: ['createdAt', 'updatedAt'],
            // },
            order: [['createdAt', 'DESC']],
            offset: offSet,
            limit: limit,
        })

        const total = await UsuarioModel.count()

        return {
            data: usuarios,
            total,
        }
    },
    async GetUsuarioById(id: string): Promise<UsuarioDTO | null> {
        try {
            return await UsuarioModel.findOne({
                where: {
                    id,
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            })
        } catch (erro: any) {
            console.log(erro)
            return null
        }
    },
    async UpdateUsuario(id: number, usuario: any) {
        // implementar codigo
    },
    async DeleteUsuario(id: number) {
        // implementar codigo
    },
    async GetUsuarioLogin(usuario: string): Promise<UsuarioDTO | null> {
        try {
            const user = await UsuarioModel.findOne({
                where: {
                    usuario,
                },
            })

            if (!user) {
                return null
            }

            const result: UsuarioDTO = {
                id: user?.id,
                nome: user.nome,
                ativo: user.ativo,
                tipo: user.tipo,
                senha: user.senha,
                usuario: user.usuario,
            }

            return result
        } catch (erro) {
            console.error(error)
            return null
        }
    },
}
