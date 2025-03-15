import { Request, Response, NextFunction } from 'express'

export function logRequisicoes(req: Request, res: Response, next: NextFunction) {
    console.log('------------------------------------------')
    console.log(`TIME: ${new Date().toISOString()}`)
    console.log(`METODO: ${req.method}`)
    console.log(`ENDPOINT: ${req.url}`)
    console.log(`BODY: ${JSON.stringify(req.body)}`)
    console.log('------------------------------------------')
    next()
}
