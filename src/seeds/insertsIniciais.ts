import { TipoUsuarioENUM } from '../utils/enum/tipoUsuario.enum'
import { UsuarioRepository } from '../repository/usuario.repository'
import { CategoriaRepository } from '../repository/categoria.repository'
import { PermissionENUM } from '../utils/enum/permission.enum'
import { SexoENUM } from '../utils/enum/sexo.enum'
import { HashPass } from '../utils/hashPass'

export async function insertsIniciais() {
    console.log('==================INSERINDO DADOS INICIAIS==================')

    await UsuarioRepository.CreateUsuario({
        nome: 'João Vitor Girardi',
        usuario: 'joaoADMIN',
        tipo: TipoUsuarioENUM.ADMIN,
        ativo: true,
        senha: await HashPass.GeraHash('abc@123'),
        sexo: SexoENUM.MASCULINO,
        rule: PermissionENUM.ADMINISTRADOR,
    })
    console.log('Usuário criado com sucesso.')

    // Inserção das categorias iniciais
    const categorias = [
        'Eletrônicos',
        'Documentos',
        'Roupas',
        'Acessórios',
        'Bolsas e mochilas',
        'Chaves',
        'Equipamentos esportivos',
        'Livros',
        'Brinquedos',
        'Ferramentas',
        'Instrumentos musicais',
        'Calçados',
        'Aparelhos médicos',
        'Dinheiro e carteiras',
        'Cartões de crédito/débito',
        'Animais de estimação',
        'Artigos de papelaria',
        'Alimentos e bebidas',
        'Equipamentos de fotografia',
        'Artigos de higiene pessoal',
        'Outros',
    ]

    for (const descricao of categorias) {
        await CategoriaRepository.Create({ descricao })
    }
    console.log(`Categorias criadas com sucesso.`)

    console.log('================FINALIZADO INSERSÃO DE DADOS================')
}
