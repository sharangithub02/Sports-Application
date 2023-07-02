const express = require('express')
const router = express.Router()
const { Register, Login, GetUser, ViewProduct, InsertProduct, ViewUser } = require('../Controllers/admin_controller')
const { UpdateProduct, DeleteProduct } = require('../Controllers/product_controller')
const { ViewOrder, UpdateOrder } = require('../Controllers/order_controller')
const { ViewPayment } = require('../Controllers/payment_controller')
const AdminAuth = require('../Middlewar/admin_auth')


// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

router.post('/register', Register)

router.post('/login', Login)

// router.post('/insert-product', AdminAuth, upload.single('product_image'), InsertProduct)
router.post('/insert-product', AdminAuth, InsertProduct)

router.get('/view-product', AdminAuth, ViewProduct)
router.get('/view-product/:id', AdminAuth, ViewProduct)

router.delete('/delete-product/:id', AdminAuth, DeleteProduct)
router.put('/update-product/:id', AdminAuth, UpdateProduct)

router.get('/view-user', AdminAuth, ViewUser)
router.get('/view-user/:id', AdminAuth, ViewUser)

router.get('/view-order', AdminAuth, ViewOrder)
router.get('/view-order/:id', AdminAuth, ViewOrder)

router.put('/update-order/:id', UpdateOrder)

router.get('/view-payment', AdminAuth, ViewPayment)
router.get('/view-payment/:id', AdminAuth, ViewPayment)


module.exports = router