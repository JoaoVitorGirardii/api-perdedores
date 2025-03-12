import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'os-perdedores',
    define: {
        timestamps: true, // Adiciona createdAt e updatedAt automaticamente
        underscored: true, // Usa snake_case para nomes de colunas
    },
})

export default sequelize
