
const {  allowedTo } = require("../user/user_auth");
const { addItemToCart, removeFromCart, updateQuantity, applyCoupon, getUserCart } = require("./cart.service");

const router = require("express").Router();
router.use( allowedTo('user'))
router.route("/").post(addItemToCart).delete(removeFromCart).put(updateQuantity).get(getUserCart)
router.post('/applyCoupon',applyCoupon)
module.exports = router;
