import { PermissionENUM } from '../enum/permission.enum'
import { TipoUsuarioENUM } from '../enum/tipoUsuario.enum'

export type LoginAuthDTO = {
    id: string
    nome: string
    tipo: TipoUsuarioENUM
    ativo: boolean
    role: PermissionENUM
}
