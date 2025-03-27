import { PermissionENUM } from '../enum/permission.enum'
import { SexoENUM } from '../enum/sexo.enum'
import { TipoUsuarioENUM } from '../enum/tipoUsuario.enum'

export type UsuarioDTO = {
    id: string
    nome: string
    usuario: string
    tipo: TipoUsuarioENUM
    rule: PermissionENUM
    ativo: boolean
    senha?: string
    sexo: SexoENUM
    createdAt?: Date
    updatedAt?: Date
}
