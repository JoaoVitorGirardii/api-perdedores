import express from 'express'
import { CategoriaController } from '../controllers/categoria.controller'

const router = express.Router()

router.post('/categoria', CategoriaController.create)
router.get('/categoria', CategoriaController.listaTodos)

export default router
