import express from 'express'
import { CategoriaController } from '../controllers/categoria.controller'
import { permission } from '../middlewares/permissionMiddleware'
import { PermissionENUM } from '../utils/enum/permission.enum'

const router = express.Router()

//rotas apenas para ADMINISTRADOR
router.post('/categoria', permission([PermissionENUM.ADMINISTRADOR]), CategoriaController.create)

//rotas liberadas para ADMINISTRADOR e USUARIO
router.get('/categoria', permission([PermissionENUM.USUARIO, PermissionENUM.ADMINISTRADOR]), CategoriaController.listaTodos)

export default router
