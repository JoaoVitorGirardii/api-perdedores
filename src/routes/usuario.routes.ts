import express from 'express'
import { UsuarioController } from '../controllers/usuario.controller'
import { permission } from '../middlewares/permissionMiddleware'
import { PermissionENUM } from '../utils/enum/permission.enum'

const router = express.Router()

//rotas apenas para ADMINISTRADOR
router.get('/usuario/listar', permission([PermissionENUM.ADMINISTRADOR]), UsuarioController.listaTodosOsUsuario)
router.post('/usuario-admin', permission([PermissionENUM.ADMINISTRADOR]), UsuarioController.createAdmin)

//rotas liberadas para ADMINISTRADOR e USUARIO
router.get('/usuario/:id', permission([PermissionENUM.USUARIO, PermissionENUM.ADMINISTRADOR]), UsuarioController.getUsuarioById)

//rota liberada para usuários se cadastrarem
router.post('/usuario', UsuarioController.createUsuario)

export default router
