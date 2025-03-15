import express from 'express'
import { ItemPerdidoController } from '../controllers/itemPerdido.controller'

const router = express.Router()

router.post('/item-perdido', ItemPerdidoController.create)
router.get('/itens-perdidos', ItemPerdidoController.listaTodosOsItens)
router.get('/itens-perdidos/usuario/:usuarioId', ItemPerdidoController.listaItensUsuarioId)

export default router
