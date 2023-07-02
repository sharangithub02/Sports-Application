const express = require('express');
const AdminSchema = require('../Models/admin')
const GrocerySchema = require('../Models/product')
const UserSchema = require('../Models/user')
const OrderSchema = require('../Models/order')
const PaymentSchema = require('../Models/payment')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const ViewPayment = async (req, res) => {
    try {
        let id = req.params.id
        if (id) {
            let payment = await PaymentSchema.findById(id)
                .populate("user_id")
            if (payment) {
                let order_no = payment[0].order_no
                let order = await OrderSchema.find({ order_no })
                return res.json({ success: true, payment, order })
            }
            else {
                res.json({ success: false, message: "Payment Not Found!!!" })
            }
        }
        else {
            let payment = await PaymentSchema.find()
                .populate("user_id")
            // var order_no = [];
            // for (i in payment) {
            //     order_no = [...order_no, payment[i].order_no]
            // }
            // console.log(order_no)

            // var order=[];
            // for (x in order_no) {
            //     let orderno = order_no[x];
            //     order = [...order,await OrderSchema.find({ order_no:orderno })]
            // }

            res.json({ success: true, payment })
        }
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}



module.exports = { ViewPayment }