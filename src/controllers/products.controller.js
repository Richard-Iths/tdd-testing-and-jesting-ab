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
    if (!product) {
      throw new Error("no product found");
    }
    return res.json({ data: { product } });
  } catch (error) {
    return next(error);
  }
};

const postProduct = async (req, res, next) => {
  const { price, name } = req.body;
  try {
    if (!price || !name) {
      throw new Error("products need name and price");
    }
    await ProductsModel.create({ price, name });
    return res.json({ data: { message: "success" } });
  } catch (error) {
    return next(error);
  }
};

export default {
  getAllProducts,
  getProduct,
  postProduct,
};
