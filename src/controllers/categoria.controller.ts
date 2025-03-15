import { Request, Response } from 'express'
import { CategoriaDTO } from '../utils/dto/categoria.dto'
import { CategoriaRepository } from '../repository/categoria.repository'

class Categoria {
    async create(req: Request, res: Response) {
        try {
            const { descricao } = req.body
            console.log(req.body)
            if (!descricao) {
                res.status(400).json({ message: 'Informe uma descrição!' })
                return
            }

            const categoriaCriada = await CategoriaRepository.Create({ descricao })
            res.status(201).json(categoriaCriada)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar categoria!' })
            return
        }
    }

    async listaTodos(req: Request, res: Response) {
        try {
            const categorias = await CategoriaRepository.GetCategorias()
            res.status(200).json(categorias)
        } catch (error: any) {
            res.status(500).json({ error: error.message })
            return
        }
    }
}

export const CategoriaController = new Categoria()
