import db from '../database/db.database.js'
const { ProductsModel } = db

const getAllProducts = async (_, res, next) => {
  try {
    const products = await ProductsModel.findAll()
    return res.json({ data: products })
  } catch (error) {
    next(error)
  }
}

export default {
  getAllProducts
}
