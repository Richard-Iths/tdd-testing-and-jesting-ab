import db from "../database/db.database.js";
import InvalidBodyException from "../models/exceptions/invalidBody-exception.model.js";

//should get cart items when user logged in
async function getCart(req, res, next) {
  try {
    const { userId } = req;
    const carts = await db.CartsModel.findAll({ where: { user_id: userId } });
    res.json({ data: carts });
  } catch (error) {
    next(error);
  }
}

//should be able to post cart items when logged in

async function postCart(req, res, next) {
  try {
    const { userId } = req;
    const { product } = req.body;
    if (!product || !product.product_id) {
      throw new InvalidBodyException("no products provided");
    }
    const modifiedProduct = {
      ...product,
      amount: 1,
      user_id: userId,
    };
    const existingProduct = await db.CartsModel.findOne({
      where: { user_id: userId, product_id: product.product_id },
    });
    if (existingProduct) {
      throw new InvalidBodyException("product exist cannot post");
    }
    await db.CartsModel.create(modifiedProduct);

    res.json({ message: `Cart successfully updated` });
  } catch (error) {
    next(error);
  }
}

//should be able to remove cart items when logged in

async function deleteCart(req, res, next) {
  try {
    const { userId } = req;
    await db.CartsModel.destroy({ where: { user_id: userId } });
    res.json({ message: `Cart successfully deleted` });
  } catch (error) {
    next(error);
  }
}

//should be able to patch cart items when logged in

async function updateCart(req, res, next) {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { amount } = req.body;
    if (isNaN(amount)) {
      throw new InvalidBodyException("amount is needed");
    }
    await db.CartsModel.update(
      { amount },
      {
        where: {
          user_id: userId,
          product_id: id,
        },
      }
    );
    await db.CartsModel.destroy({
      where: {
        user_id: userId,
        amount: 0,
      },
    });
    res.json({ message: `Cart successfully patched` });
  } catch (error) {
    next(error);
  }
}

export default {
  getCart,
  deleteCart,
  postCart,
  updateCart,
};
