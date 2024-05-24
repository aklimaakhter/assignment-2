import { Request, Response } from 'express'
import orderValidationSchema from './order.validation'
import { OrderServices } from './order.services'

const createOrders = async (req: Request, res: Response) => {
  try {
    const orderData = req.body

    // Validate orderData against the validation schema
    const { error, value } = orderValidationSchema.validate(orderData)

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details,
      })
    }

    const result = await OrderServices.createOrderIntoDB(value)

    return res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDB()
    res.status(200).json({
      success: true,
      message: 'Orders are retrieved successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

export const OrderControllers = {
  createOrders,
  getAllOrders,
}
