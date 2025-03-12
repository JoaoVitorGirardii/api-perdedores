import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class Usuario extends Model {
    public id!: number
    public nome!: string
}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'usuario',
        tableName: 'usuario',
    },
)

export const UsuarioModel = Usuario
