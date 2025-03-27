import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { TipoUsuarioENUM } from '../utils/enum/tipoUsuario.enum'
import { PermissionENUM } from '../utils/enum/permission.enum'
import { SexoENUM } from '../utils/enum/sexo.enum'

class Usuario extends Model {
    public id!: string
    public nome!: string
    public usuario!: string
    public tipo!: TipoUsuarioENUM
    public ativo!: boolean
    public senha!: string
    public rule!: PermissionENUM
    public sexo!: SexoENUM
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
        sexo: {
            type: DataTypes.ENUM(SexoENUM.FEMININO, SexoENUM.MASCULINO, SexoENUM.OUTROS),
            allowNull: false,
            defaultValue: SexoENUM.OUTROS,
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
        rule: {
            type: DataTypes.ENUM(PermissionENUM.ADMINISTRADOR, PermissionENUM.USUARIO),
            allowNull: false,
            defaultValue: PermissionENUM.USUARIO,
        },
    },
    {
        sequelize,
        modelName: 'usuario',
        tableName: 'usuario',
    },
)

export const UsuarioModel = Usuario
