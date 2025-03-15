import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { UsuarioModel } from './usuario.model'

export class ItemPerdidoModel extends Model {
    public id!: string
    public item!: string
    public nome!: string
    public valor!: number
    public dataPerca!: Date
    public descricao!: string
    public usuarioId!: string
}

ItemPerdidoModel.init(
    {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        usuarioId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'usuario_id',
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
        dataPerca: {
            type: DataTypes.DATE,
            field: 'data_perca',
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
