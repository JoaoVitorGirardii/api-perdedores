import express from 'express'
import { UsuarioController } from '../controllers/usuario.controller'
import { permission } from '../middlewares/permissionMiddleware'
import { PermissionENUM } from '../utils/enum/permission.enum'

const router = express.Router()

//rotas apenas para ADMINISTRADOR
router.get('/usuario/listar', permission([PermissionENUM.ADMINISTRADOR]), UsuarioController.listaTodosOsUsuario)

//rotas liberadas para ADMINISTRADOR e USUARIO
router.post('/usuario', permission([PermissionENUM.USUARIO, PermissionENUM.ADMINISTRADOR]), UsuarioController.create)
router.get('/usuario/:id', permission([PermissionENUM.USUARIO, PermissionENUM.ADMINISTRADOR]), UsuarioController.getUsuarioById)

export default router
