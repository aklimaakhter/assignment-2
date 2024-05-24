import Joi from 'joi'

// Define the Joi schema for Variant
const variantValidationSchema = Joi.object({
  type: Joi.string().trim().required().messages({
    'string.base': 'Variant type must be a string',
    'string.empty': 'Variant type is required',
    'any.required': 'Variant type is required',
  }),
  value: Joi.string().trim().required().messages({
    'string.base': 'Variant value must be a string',
    'string.empty': 'Variant value is required',
    'any.required': 'Variant value is required',
  }),
})

// Define the Joi schema for Inventory
const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().min(0).required().messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity cannot be negative',
    'any.required': 'Quantity is required',
  }),
  inStock: Joi.boolean().required().messages({
    'boolean.base': 'In stock status must be a boolean',
    'any.required': 'In stock status is required',
  }),
})

// Define the Joi schema for Product
const productValidationSchema = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    'string.base': 'Product name must be a string',
    'string.empty': 'Product name is required',
    'string.max': 'Product name cannot exceed 100 characters',
    'any.required': 'Product name is required',
  }),
  description: Joi.string().trim().required().messages({
    'string.base': 'Product description must be a string',
    'string.empty': 'Product description is required',
    'any.required': 'Product description is required',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Product price must be a number',
    'number.min': 'Product price cannot be negative',
    'any.required': 'Product price is required',
  }),
  category: Joi.string().trim().required().messages({
    'string.base': 'Product category must be a string',
    'string.empty': 'Product category is required',
    'any.required': 'Product category is required',
  }),
  tags: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.base': 'Tags must be an array',
    'array.min': 'There must be at least one tag',
    'any.required': 'Tags are required',
  }),
  variants: Joi.array()
    .items(variantValidationSchema)
    .min(1)
    .required()
    .messages({
      'array.base': 'Variants must be an array',
      'array.min': 'There must be at least one variant',
      'any.required': 'Variants are required',
    }),
  inventory: inventoryValidationSchema.required().messages({
    'any.required': 'Inventory details are required',
  }),
})

export default productValidationSchema
