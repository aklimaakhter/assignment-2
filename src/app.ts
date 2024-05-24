import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { OrderRoutes } from './app/modules/orders/order.route'
const app: Application = express()
// const port = 3000;

app.use(express.json())
app.use(cors())

app.use('/api/products', ProductRoutes)
app.use('/api/Orders', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running...')
})

app.all('/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})
// console.log(process.cwd());
export default app
