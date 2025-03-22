import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { TipoUsuarioENUM } from '../utils/enum/tipoUsuario.enum'

class Categoria extends Model {
    public id!: string
    public descricao!: string
}

Categoria.init(
    {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'categoria',
        tableName: 'categoria',
    },
)

export const CategoriaModel = Categoria
