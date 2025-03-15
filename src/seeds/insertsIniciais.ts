import { TipoUsuarioDTO } from '../utils/enum/tipoUsuario.enum'
import { UsuarioRepository } from '../repository/usuario.repository'

export async function insertsIniciais() {
    console.log('==================INSERINDO DADOS INICIAIS==================')
    await UsuarioRepository.CreateUsuario({ nome: 'João Vitor Girardi', tipo: TipoUsuarioDTO.ADMIN })
    console.log('Usuário criado com sucesso.')
    console.log('================FINALIZADO INSERSÃO DE DADOS================')
}
