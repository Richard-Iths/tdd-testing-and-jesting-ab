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
    const { products } = req.body;

    if (!products) {
      throw new InvalidBodyException("no products provided");
    }
    const modifiedProducts = products.map((product) => ({
      ...product,
      user_id: userId,
    }));
    await db.CartsModel.bulkCreate(modifiedProducts, {
      updateOnDuplicate: ["user_id", "product_id", "amount"],
    });
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
