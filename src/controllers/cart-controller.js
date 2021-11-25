import db from "../database/db.database.js";

//should get cart items when user logged in
async function getCart(req, res, next) {
  try {
    const { userId } = req;
    const carts = await db.CartsModel.findAll({ where: { user_id: userId } }); //Var kommer användar id från?
    res.json({ data: carts });
  } catch (error) {
    next(error);
  }
}

//should be able to post cart items when logged in

//should be able to remove cart items when logged in

//should be able to patch cart items when logged in

export default { getCart };
