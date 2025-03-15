import { UsuarioDTO } from '../utils/dto/usuario.dto'
import { UsuarioModel } from '../models/usuario.model'

export const usuarioRepository = {
    async CreateUsuario(usuario: Omit<UsuarioDTO, 'id'>): Promise<UsuarioDTO> {
        const usuarioCriado = await UsuarioModel.create(usuario)
        return usuarioCriado
    },
    async GetUsuarios() {
        // implementar codigo
    },
    async GetUsuarioById(id: number) {
        // implementar codigo
    },
    async UpdateUsuario(id: number, usuario: any) {
        // implementar codigo
    },
    async DeleteUsuario(id: number) {
        // implementar codigo
    },
}
