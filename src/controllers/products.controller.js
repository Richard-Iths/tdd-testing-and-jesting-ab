import db from "../database/db.database.js";
import InvalidBodyException from "../models/exceptions/invalidBody-exception.model.js";
import NotFoundException from "../models/exceptions/notFound-exepction.model.js";
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
      throw new NotFoundException("the product seems to be out of stock");
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
      throw new InvalidBodyException("price and name needs to be included");
    }
    await ProductsModel.create({ price, name });
    return res.json({ data: { message: "success" } });
  } catch (error) {
    return next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await ProductsModel.destroy({ where: { product_id: id } });
    return res.json({ data: { message: "success" } });
  } catch (error) {
    next(error);
  }
};
const putProduct = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!data.name && !data.price) {
      throw new InvalidBodyException("price or name needs to be included");
    }
    await ProductsModel.update(
      { ...data },
      {
        where: { product_id: id },
      }
    );
    return res.json({ data: { message: "success" } });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllProducts,
  getProduct,
  postProduct,
  deleteProduct,
  putProduct,
};
