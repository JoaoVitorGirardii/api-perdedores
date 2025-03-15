import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { TipoUsuarioDTO } from '../utils/enum/tipoUsuario.enum'

class Usuario extends Model {
    public id!: string
    public nome!: string
    public tipo!: TipoUsuarioDTO
}

Usuario.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM(TipoUsuarioDTO.ADMIN, TipoUsuarioDTO.USER),
            allowNull: false,
            defaultValue: TipoUsuarioDTO.USER,
        },
    },
    {
        sequelize,
        modelName: 'usuario',
        tableName: 'usuario',
    },
)

export const UsuarioModel = Usuario
