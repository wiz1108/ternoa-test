import { Response, Request } from 'express'
import itemService from '../services/item'

const addItem = async (req: Request, res: Response) => {
  try {
    const params = req.body
    if (params === undefined) {
      return res.status(400).json({ success: false, data: null, message: 'Bad Request!' })
    }
    const result = await itemService.createOne(params)
    return res.status(200).json({ success: true, data: result, message: 'Add Item is Success!' })
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: 'Backend Server Error!' })
  }
}

const deleteItem = async (req: Request, res: Response) => {
  try {
    const params = req.body
    if (params === undefined) {
      return res.status(400).json({ success: false, data: null, message: 'Bad Request!' })
    }

    const result = await itemService.deleteOne(params)
    return res.status(200).json({ success: true, data: result, message: 'Delete Item is Success!' })

  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: 'Backend Server Error!' })
  }
}

const updateItem = async (req: Request, res: Response) => {
  try {
    const params = req.body
    console.log(params)
    if (params === undefined) {
      return res.status(400).json({ success: false, data: null, message: 'Bad Request!' })
    }
    else {
      const result = await itemService.updateOne(params)
      return res.status(200).json({ success: true, data: result, message: 'Update Item is Success!' })
    }
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: 'Backend Server Error!' })
  }
}

const getItem = async (req: Request, res: Response) => {
  try {
    const result = await itemService.findAll()
    return res.status(200).json({ success: true, data: result, message: 'Get Item is Success!' })
  } catch (error) {
    return res.status(500).json({ success: false, data: null, message: 'Backend Server Error!' })
  }
}

export default {
  addItem,
  deleteItem,
  updateItem,
  getItem
}
