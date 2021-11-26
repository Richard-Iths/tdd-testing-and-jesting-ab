import db from "../database/db.database.js";

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
    await db.CartsModel.create({ where: { user_id: userId } });
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
    await db.CartsModel.update({ where: { user_id: userId } });
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
