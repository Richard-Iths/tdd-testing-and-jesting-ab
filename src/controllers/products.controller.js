import db from "../database/db.database.js";
const { ProductsModel } = db;

const getAllProducts = async (_, res, next) => {
  try {
    const products = await ProductsModel.findAll();
    return res.json({ data: products });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductsModel.findByPk(id);
    return res.json({ data: { product } });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllProducts,
  getProduct,
};
