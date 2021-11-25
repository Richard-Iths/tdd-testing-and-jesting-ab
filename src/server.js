import express from 'express'
import BaseException from './models/exceptions/base-exception.model.js'
import router from './routes/index.js'
import db from './database/db.database.js'

const app = express()
const PORT = process.env.PORT || 3000

await db.sync(db.sequelize, false)

app.use(express.json())

app.get('/', (req, res, next) => {
  res.json({ message: 'success' })
})

app.use('/api/users', router.userRoutes)
app.use('/api/carts', router.cartRoutes)
app.use('/api/products', router.productsRoutes)

app.use((err, req, res, next) => {
  if (err instanceof BaseException) {
    return res.status(err.statusCode).json({ data: { message: err.message } })
  }
  res.status(500).json({ data: { message: 'Something went wrong, please try again' } })
})

const server = app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`)
})

export default server
