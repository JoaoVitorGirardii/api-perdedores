import sequelize from '../config/database'
import { insertsIniciais } from '../seeds/insertsIniciais'

export async function initializeDatabase() {
    try {
        await sequelize.authenticate()
        console.log('Conexão com o baco de dados realizada com sucesso.')

        const atualizaTabelas = false

        await sequelize.sync({ force: atualizaTabelas }) // Só add true quando mudar algo no banco

        if (atualizaTabelas) {
            await insertsIniciais()
            console.log('Banco de dados sincronizado.')
        }
    } catch (error) {
        console.error('Não foi possível estabelecer conexão com o banco de dados: ', error)
    }
}
