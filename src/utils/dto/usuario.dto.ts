import { TipoUsuarioDTO } from '../enum/tipoUsuario.enum'

export type UsuarioDTO = {
    id: string
    nome: string
    tipo: TipoUsuarioDTO
}
