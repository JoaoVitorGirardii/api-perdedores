import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { UsuarioModel } from './usuario.model'
import { CategoriaModel } from './categoria.model'

export class ItemPerdidoModel extends Model {
    public id!: string
    public nome!: string
    public valor!: number
    public dataPerca!: Date
    public descricao!: string
    public usuarioId!: string
    public categoriaId!: string
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
        categoriaId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'categoria_id',
            references: {
                model: CategoriaModel,
                key: 'id',
            },
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
CategoriaModel.hasMany(ItemPerdidoModel, { foreignKey: 'categoria_id' })
ItemPerdidoModel.belongsTo(CategoriaModel, { foreignKey: 'categoria_id' })

export const ItemPerdido = ItemPerdidoModel
