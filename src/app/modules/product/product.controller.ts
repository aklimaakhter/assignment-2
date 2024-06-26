import { Request, Response } from 'express'
import { ProductServices } from './product.service'
import productValidationSchema from './product.validation'

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body

    //  creating schema a validation using Joi
    const { error, value } = productValidationSchema.validate(productData)

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details,
      })
    }

    const result = await ProductServices.createProductIntoDB(value)

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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query

    if (searchTerm) {
      const result = await ProductServices.searchProductValue(
        searchTerm as string,
      )

      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      })

      if (!searchTerm) {
        return res
          .status(400)
          .json({ success: false, message: 'Search term is required' })
      }
    } else {
      const result = await ProductServices.getAllProductsFromDB()

      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    console.log(productId)
    const result = await ProductServices.getSingleProductsFromDB(productId)
    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong ',
      error: err,
    })
  }
}

const updateSingleData = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const updatedData = req.body

    //  creating schema a validation using Joi
    const { error, value } = productValidationSchema.validate(updatedData)

    const result = await ProductServices.updateProductSingleValue(
      productId,
      value,
    )

    if (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        error: error.details,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteSingleData = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const result = await ProductServices.deleteProductSingleValue(productId)

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleData,
  deleteSingleData,
}
