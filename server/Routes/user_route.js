const express = require('express')
const router = express.Router()
const { Register,
    Login,
    Shipping, 

    GetProduct,
    InsertCart,
    ViewCart,
    DeleteCart,
    ViewOrder
 } = require('../Controllers/user_controller')
const UserAuth = require('../Middlewar/user_auth')

router.post('/register', Register)

router.post('/login', Login)


// router.get('/view-product', UserAuth, Viewproduct) --old
// router.get('/view-product/:id', UserAuth, Viewproduct) --old

router.get("/product", GetProduct);
router.get("/product/:id",UserAuth, GetProduct);

router.post('/insert-cart', UserAuth, InsertCart)
router.get('/view-cart', UserAuth, ViewCart)

router.get('/view-order', UserAuth, ViewOrder)

router.delete("/delete-cart/:id", UserAuth, DeleteCart);

router.post('/shipping', UserAuth, Shipping)



module.exports = router


// const router = require("express").Router();
// const userAuth = require('../Middleware/userAuth')
// const {
//   Register,
//   Login,
//   GetProduct,
//   InsertCart,
//   ViewCart,
//   DeleteCart
// } = require("../Controller/user_controller");

// router.post("/register", Register);
// router.post("/login", Login);

// router.get("/product", GetProduct);
// router.get("/product/:id",userAuth, GetProduct);

// router.post("/insert-cart", userAuth, InsertCart);
// router.get("/view-cart", userAuth, ViewCart);

// router.delete("/delete-cart/:id", userAuth, DeleteCart);

// module.exports = router;
