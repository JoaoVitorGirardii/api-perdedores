import express from 'express'
import { UsuarioController } from '../controllers/usuario.controller'

const router = express.Router()

router.post('/usuario', UsuarioController.create)
router.get('/usuario/listar', UsuarioController.listaTodosOsUsuario)
router.get('/usuario/:id', UsuarioController.getUsuarioById)

export default router
