import Joi from 'joi'

const orderValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(1).required(),
})

export default orderValidationSchema
