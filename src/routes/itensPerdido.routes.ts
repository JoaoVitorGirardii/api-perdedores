import express from 'express'
import { ItemPerdidoController } from '../controllers/itemPerdido.controller'

const router = express.Router()

router.post('/item-perdido', ItemPerdidoController.create)
router.get('/item-perdido', ItemPerdidoController.listaTodosOsItens)

export default router
