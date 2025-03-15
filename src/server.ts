import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import itensPerdidosRouter from './routes/itensPerdido.routes'
import usuarioRouter from './routes/usuario.routes'
import { initializeDatabase } from './utils/utils'
import { logRequisicoes } from './middlewares/logRequisicoes'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3333

app.use(
    cors({
        origin: '*',
    }),
)

app.use(express.json())

app.use(logRequisicoes)

app.use('/api', [itensPerdidosRouter, usuarioRouter])

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API ONLINE 🔥🚀' })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🔥🚀`)
})

initializeDatabase()
