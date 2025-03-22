import dotenv from 'dotenv'
dotenv.config()

import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import itensPerdidosRouter from './routes/itensPerdido.routes'
import usuarioRouter from './routes/usuario.routes'
import categoriaRouter from './routes/categoria.routes'
import loginRouter from './routes/login.routes'

import { initializeDatabase } from './utils/initializeDatabase'
import { logRequisicoes } from './middlewares/logRequisicoes'
import { authMiddleware } from './middlewares/authMiddleware'

const app: Express = express()
const PORT = process.env.PORT

app.use(
    cors({
        origin: '*',
    }),
)

app.use(express.json())

app.use(logRequisicoes)
app.use(authMiddleware)

app.use('/api', [itensPerdidosRouter, usuarioRouter, categoriaRouter, loginRouter])

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API ONLINE 🔥🚀' })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🔥🚀`)
})

initializeDatabase()
