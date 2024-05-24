import { Order } from './order.interface'
import { OrderModel } from './order.model'

const createOrderIntoDB = async (order: Order) => {
  const result = await OrderModel.create(order)
  return result
}

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find()
  return result
}

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
}
