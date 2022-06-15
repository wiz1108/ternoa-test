import { Item, IItem } from '../models/item'

const findAll = async () => {
  const result: IItem[] = await Item.find()
  return result
}

const findOne = async (filter: any) => {
  const result: IItem = await Item.findOne(filter)
  return result
}

const createOne = async (data: any) => {
  const result: IItem = await Item.create(data)
  return result
}

const updateOne = async (data: any) => {
  const filter = { _id: data._id }
  delete data._id
  const result: IItem = await Item.findOneAndUpdate(filter, data, { new: true })

  return result
}

const deleteAll = async () => {
  const result = await Item.deleteMany({})
  return result
}

const deleteOne = async (data: any) => {
  const result = await Item.deleteOne({ _id: data._id })
  return result
}

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteAll,
  deleteOne,
}