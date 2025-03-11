import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5500

app.use(
    cors({
        origin: '*',
    }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API ONLINE 🔥🚀' })
})

// Start server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🔥🚀`)
})
