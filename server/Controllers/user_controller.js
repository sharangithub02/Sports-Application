const express = require('express');
const UserSchema = require('../Models/user')
const ProductSchema = require('../Models/product')
const CartSchema = require('../Models/cart')
const ShippingSchema = require('../Models/shipping')
const OrderSchema = require('../Models/order')
const PaymentSchema = require('../Models/payment')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// const Register = async (req, res) => {
//     try {
//         const { name, phone, email, password, address } = req.body
//         let user = await UserSchema.findOne({ email })
//         if (user) {
//             return res.json({ success: false, message: "email already exist" })
//         }
//         let salt = await bcrypt.genSalt(10)
//         let secPass = await bcrypt.hash(password, salt)
//         user = new UserSchema({ name, email, phone, password: secPass, address })
//         let saveduser = await user.save()
//         res.json({ success: true, saveduser })
//     }
//     catch (err) {
//         res.json({ success: false, message: "Internal server error!!!" })
//         console.log(err)
//     }
// }

const Register = async (req, res) => {
    try {
      const { name, phone, address, pinCode, email, password } = req.body;
  
      console.log({ name, phone, address, pinCode, email, password })
  
      let user = await UserSchema.findOne({ email });
  
      if (user) {
        return res.json({ success: false, message: "Email already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
  
      user = new UserSchema({
        name,
        phone,
        address,
        pinCode,
        email,
        password: secPass,
      });
  
      let savedUser = await user.save();
  
      res.json({
        success: true,
        message: `User with name ${savedUser.name} added successfully`,
      });
    } catch (err) {
      console.log(err);
    }
  };

// const Login = async (req, res) => {
//     try {
//         const { emailorphone, password } = req.body;
//         let user = await UserSchema.findOne({ $or: [{ email: emailorphone }, { phone: emailorphone }] })
//         // let user = await UserSchema.findOne({ email })
//         if (!user) {
//             return res.json({ success: false, message: "Incorrect details" })
//         }
//         let passwordCompare = await bcrypt.compare(password, user.password)
//         if (!passwordCompare) {
//             return res.json({ success: false, message: "Incorrect details" })
//         }
//         let data = {
//             user: {
//                 id: user.id
//             }
//         }
//         let authToken = await jwt.sign(data, process.env.JWT_SECRET)
//         res.json({ success: true, authToken })
//     }
//     catch (err) {
//         res.json({ success: false, message: "Internal server error!!!" })
//         console.log(err)
//     }
// }

const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await UserSchema.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "Incorrect Credentials" });
      }
  
      let comparePassword = await bcrypt.compare(password, user.password);
  
      if (!comparePassword) {
        return res.status(404).json({ success: false, message: "Invalid Credentials" });
      }
  
      let data = {
        user: {
          id: user.id,
        },
      };
  
      let authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success: true, authToken });
    } catch (err) {
      console.log(err);
    }
  };

// const ViewProduct = async (req, res) => {
//     try {
//         let id = req.params.id
//         if (id) {
//             let Product = await ProductSchema.findById(id)
//             res.json({ success: true, Product })
//         }
//         else {
//             let Product = await ProductSchema.find()
//             res.json({ success: true, Product })
//         }
//     }
//     catch (err) {
//         res.json({ success: false, message: "Internal server error!!!" })
//         console.log(err)
//     }
// }



// const InsertCart = async (req, res) => {
//     try {
//         let user_id = req.user.id
//         const { product_id, quantity, price } = req.body;
//         console.log(product_id, quantity, 11111111111111)

//         let already = await CartSchema.find({ $and: [{ user_id }, { product_id }] });
//         // console.log(already)
//         if (already) {
//             let cart_id = already[0]?._id;
//             let qty = Number(already[0]?.quantity) + Number(quantity);
//             let updatedCart = await CartSchema.findByIdAndUpdate(cart_id, { $set: { quantity: qty, price } }, { new: true });
//             return res.json({ success: true, updatedCart })
//         }
//         else {
//             let cart = new CartSchema({ user_id, product_id, quantity, price })
//             let savedCart = await cart.save()
//             res.json({ success: true, savedCart })
//         }
//     }
//     catch (err) {
//         res.json({ success: false, message: "Internal server error!!!" })
//         console.log(err)
//     }
// }

// const ViewCart = async (req, res) => {
//     try {
//         let user_id = req.user.id
//         let cart = await CartSchema.find({ user_id })
//             .populate('product_id')

//         res.json({ success: true, cart })
//     }
//     catch (err) {
//         res.json({ success: false, message: "Internal server error!!!" })
//         console.log(err)
//     }
// }


const Shipping = async (req, res) => {
    try {
        let user_id = req.user.id
        const { name, phone, address, pin_code, payment_type, total } = req.body
        let cart = await CartSchema.find({ user_id })

        let shipping;
        let savedShipping;
        let constent = "SHIP-"
        let uniq_id = 1001;
        let combine = constent + uniq_id;

        let data = await ShippingSchema.find()
        let length = data.length
        if (length > 0) {
            let index = length - 1
            console.log(length + " length")
            let ship_no = data[index].shipping_no;
            let array = ship_no.split("-");
            uniq_id = Number(array[1]) + 1;
            combine = constent + uniq_id;
        }


        let order_constent = "ORD-"
        let order_uniq_id = 1001;
        let order_combine = order_constent + order_uniq_id;

        let order_data = await OrderSchema.find()
        let order_length = order_data.length
        if (order_length > 0) {
            let index = order_length - 1
            console.log(order_length + " length")
            let order_no = order_data[index].order_no;
            let array = order_no.split("-");
            order_uniq_id = Number(array[1]) + 1;
            order_combine = order_constent + order_uniq_id;
        }

        var savedOrder;

        cart.map(async (item) => {
            let cart_id = item._id;
            let price = item.price;
            let quantity = item.quantity;
            let product_id = item.product_id;
            shipping = new ShippingSchema({ shipping_no: combine, user_id, cart_id, product_id, name, phone, address, pin_code })
            savedShipping = await shipping.save();

            let shipping_id = savedShipping._id
            let order = new OrderSchema({ user_id, order_no: order_combine, shipping_id, product_id, quantity, price, status: "pending" })
            savedOrder = await order.save()
        })
        console.log(order_combine, 22222222)


        let payment = new PaymentSchema({ user_id, order_no: order_combine, status: "completed", total, payment_type })
        let savedPayment = await payment.save()

        let deletedCart = await CartSchema.deleteMany({user_id})


        res.json({ success: true, savedShipping, savedOrder, savedPayment })

    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

const GetProduct = async (req, res) => {
    try {
        const product = await ProductSchema.find();
        res.json({success:true,product});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const InsertCart = async (req, res) => {
    try {
        const { product_id, quantity, price } = req.body;
        const user_id = req.user.id;

        const isProductPresent = await CartSchema.findOne({ product_id, user_id });

        if (isProductPresent) {
            isProductPresent.quantity += quantity;
            await isProductPresent.save();
            return res.json({ success: true, message: `Added ${quantity}` });
        }

        const cart = new CartSchema({ user_id, product_id, quantity, price });

        const savedCart = await cart.save();
        res.json({ success: true, savedCart });
    } catch (err) {
        res.json({ success: false, message: 'unsuccessful' });
        console.log(err.message);
    }
};

const ViewCart = async (req, res) => {
    try {
      let id = req.user.id
      
      let cart = await CartSchema.find({ user_id: id })
      .populate('product_id')
      if (cart) {
        return res.json({ success: true, cart })
      }
      else {
        return res.json({ success: false, message: "NO cart" })
      }
    }
    catch (err) {
      res.json({ success: false, message: "Internal server error!!!!" })
      console.log(err.message)
    }
  }

  const DeleteCart = async (req, res) => {
    try {
      let id = req.params.id
  
  
      const isCart = await CartSchema.findById(id)
  
      if (isCart) {
        let deletedCart = await CartSchema.findByIdAndDelete(id)
        res.json({ success: true, deletedCart })
      } else {
        res.json({ success: false, message: 'No cart found' })
      }
    }
    catch (err) {
      res.json({ success: false, message: "Internal server error!!!!" })
      console.log(err.message)
    }
  }

  const ViewOrder = async (req, res) => {
    try {
        let id = req.user.id
        if (id) {
            let order = await OrderSchema.find({ user_id: id })
                .populate(["shipping_id", "user_id", "product_id"])
            if (order) {
                return res.json({ success: true, order })
            }
            else {
                res.json({ success: false, message: "Order Not Found!!!" })
            }
        }
        else {
            let order = await OrderSchema.find()
                .populate(["shipping_id", "user_id", "product_id"])

            res.json({ success: true, order })
        }
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}
  

module.exports = { Register, Login, GetProduct, InsertCart, ViewCart, Shipping, DeleteCart, ViewOrder }