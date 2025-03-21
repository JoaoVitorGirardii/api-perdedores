import express from 'express'
import { LoginController } from '../controllers/login.controller'

const router = express.Router()

router.post('/login', LoginController.login)

export default router
