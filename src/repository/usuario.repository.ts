import { UsuarioDTO } from '../utils/dto/usuario.dto'
import { UsuarioModel } from '../models/usuario.model'

export const UsuarioRepository = {
    async CreateUsuario(usuario: Omit<UsuarioDTO, 'id'>): Promise<UsuarioDTO> {
        const usuarioCriado = await UsuarioModel.create(usuario)

        //remove o create e o update
        const { createdAt, updatedAt, ...usuarioReturn } = usuarioCriado.toJSON()

        return usuarioReturn as UsuarioDTO
    },
    async GetUsuarios(): Promise<UsuarioDTO[]> {
        return await UsuarioModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
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
}
