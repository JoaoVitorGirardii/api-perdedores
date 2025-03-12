import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { UsuarioModel } from './usuario.model'

export class ItemPerdidoModel extends Model {
    id!: number
    public item!: string
    public nome!: string
    public valor!: number
    public data_perca!: Date
    public descricao!: string
    public usuario_id!: number
}

ItemPerdidoModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UsuarioModel,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        item: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        data_perca: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'itens_perdidos',
        tableName: 'itens_perdidos',
    },
)

UsuarioModel.hasMany(ItemPerdidoModel, { foreignKey: 'usuario_id' })
ItemPerdidoModel.belongsTo(UsuarioModel, { foreignKey: 'usuario_id' })

export const ItemPerdido = ItemPerdidoModel
