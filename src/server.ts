import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './config/database'
import itensPerdidosRouter from './routes/itensPerdido.routes'
import './models/usuario.model' // Importa o modelo de Usuario
import './models/itemPerdido.model'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3333

async function initializeDatabase() {
    try {
        await sequelize.authenticate()
        console.log('Conexão com o baco de dados realizada com sucesso.')

        // For development only - don't use force: true in production!
        await sequelize.sync({ force: true })
        console.log('Banco de dados sincronizado.')
    } catch (error) {
        console.error('Não foi possível estabelecer conexão com o banco de dados: ', error)
    }
}

app.use(
    cors({
        origin: '*',
    }),
)
app.use(express.json())
app.use('/api', [itensPerdidosRouter])

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API ONLINE 🔥🚀' })
})

// Start server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🔥🚀`)
})

initializeDatabase()
