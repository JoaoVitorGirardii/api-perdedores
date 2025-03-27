import express from 'express'
import { ItemPerdidoController } from '../controllers/itemPerdido.controller'
import { permission } from '../middlewares/permissionMiddleware'
import { PermissionENUM } from '../utils/enum/permission.enum'

const router = express.Router()

//rotas apenas para ADMINISTRADOR
router.get('/itens-perdidos', permission([PermissionENUM.ADMINISTRADOR]), ItemPerdidoController.listaTodosOsItens)

//rotas liberadas para ADMINISTRADOR e USUARIO
router.post('/item-perdido', permission([PermissionENUM.USUARIO, PermissionENUM.ADMINISTRADOR]), ItemPerdidoController.create)
router.get(
    '/itens-perdidos/usuario/:usuarioId',
    permission([PermissionENUM.USUARIO, PermissionENUM.ADMINISTRADOR]),
    ItemPerdidoController.listaItensUsuarioId,
)
router.get(
    '/itens-perdidos/top10/usuarios',
    permission([PermissionENUM.USUARIO, PermissionENUM.ADMINISTRADOR]),
    ItemPerdidoController.topDezPessoasPerdedoras,
)
router.get('/itens-perdidos/top10', permission([PermissionENUM.USUARIO, PermissionENUM.ADMINISTRADOR]), ItemPerdidoController.topDez)
export default router
