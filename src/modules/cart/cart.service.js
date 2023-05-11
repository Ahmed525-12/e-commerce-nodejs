const CartModel = require('../cart/cart.model')
const AppError = require("../../utils/appErrors");
const catchAsyncError= require('express-async-handler');
const ProductModel = require('../product/proudct_model')
const CouponModel = require('../coupon/coupon_model')
function calcTotalPrice(cart) {
    let totalPrice = 0
    cart.cartItems.forEach((elm) => {
        totalPrice += elm.price * elm.quantity
    })

    cart.totalPrice = totalPrice

    if (cart.totalPriceAfterDiscount) {
        cart.totalPriceAfterDiscount =
            (cart.totalPrice - (cart.totalPrice * cart.discount) / 100).toFixed(2)
        console.log(cart.discount);
    }else{
        cart.discount=0
    }
}

exports.addItemToCart = catchAsyncError(async (req, res, next) => {
    let { price } = await ProductModel.findById(req.body.product)
    if (!price) next(new AppError('product not found', 404))
    req.body.price = price
    let cart = await CartModel.findOne({ user: req.user._id })
    if (!cart) {

        let newCart = new CartModel({
            cartItems: [req.body],
            user: req.user._id
        })
        calcTotalPrice(newCart)
        await newCart.save()
        res.status(200).json({ message: "cart created successfully.", newCart })

    } else {

        let findedProduct = cart.cartItems.find((elm) => elm.product == req.body.product)

        if (findedProduct) {
            findedProduct.quantity += 1
        } else {
            cart.cartItems.push(req.body)
        }


        calcTotalPrice(cart)
        await cart.save()
        res.status(200).json({ cart })

    }
});


exports.removeFromCart = catchAsyncError(async (req, res, next) => {
    let cart = await CartModel.findOneAndUpdate({ user: req.user._id }, {
        $pull: { cartItems: { _id: req.body.itemId } }
    }, { new: true });
    calcTotalPrice(cart)
    await cart.save();
    !cart && next(new AppError("product not found", 400));
    cart && res.status(200).json(cart);
});


exports.updateQuantity = catchAsyncError(async (req, res, next) => {
    let cart = await CartModel.findOne({ user: req.user._id })
    let findedProduct = cart.cartItems.find((elm) => elm.product == req.body.product)
    if (findedProduct) {
        findedProduct.quantity = req.body.quantity
    }
    calcTotalPrice(cart)

    await cart.save()
    res.status(200).json({ cart })
});



exports.applyCoupon = catchAsyncError(async (req, res, next) => {
    let { code, discount } = await CouponModel.findOne({ code: req.body.code, expires: { $gt: Date.now() } })
    if (!code) return next(new AppError('coupn not found or expired'))
    let cart = await CartModel.findOne({ user: req.user._id })
    cart.totalPriceAfterDiscount = (cart.totalPrice - (cart.totalPrice * discount) / 100).toFixed(2)
    cart.discount = discount
    await cart.save()
    res.status(200).json({ cart })
});


exports.getUserCart = catchAsyncError(async (req, res, next) => {
    let cart = await CartModel.findOne({ user: req.user._id });
    !cart && next(new AppError("cart not found", 400));
    cart && res.status(200).json({ count: cart.cartItems.length, cart });
});
