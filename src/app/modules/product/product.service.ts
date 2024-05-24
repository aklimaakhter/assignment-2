import { ProductModel } from '../product.model'
import { Product } from './product.interface'

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product)
  return result
}

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find()
  return result
}

const getSingleProductsFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id })
  return result
}

const updateProductSingleValue = async (_id: string, updatedData: Product) => {
  const result = await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
  })
  return result
}

const deleteProductSingleValue = async (_id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id })
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
  updateProductSingleValue,
  deleteProductSingleValue,
}
