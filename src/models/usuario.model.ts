import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { TipoUsuarioENUM } from '../utils/enum/tipoUsuario.enum'

class Usuario extends Model {
    public id!: string
    public nome!: string
    public usuario!: string
    public tipo!: TipoUsuarioENUM
    public ativo!: boolean
    public senha!: string
}

Usuario.init(
    {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM(TipoUsuarioENUM.ADMIN, TipoUsuarioENUM.USER),
            allowNull: false,
            defaultValue: TipoUsuarioENUM.USER,
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        senha: {
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
