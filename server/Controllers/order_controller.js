const express = require('express');
const AdminSchema = require('../Models/admin')
const ProductSchema = require('../Models/product')
const UserSchema = require('../Models/user')
const OrderSchema = require('../Models/order')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const ViewOrder = async (req, res) => {
    try {
        let id = req.params.id
        if (id) {
            let order = await OrderSchema.find({ order_no: id })
                .populate(["shipping_id", "user_id", "product_id" ])

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

const UpdateOrder = async (req, res) => {
    try {
        let id = req.params.id
        let order = await OrderSchema.find({ order_no: id })
        if (order[0].status == 'pending') {
            order.map(async (item) => {
                let id = item._id
                let up_order = await OrderSchema.findByIdAndUpdate(id, { $set: { status: "confirmed" } }, { new: true })
                console.log(up_order, 1111111)
            })
            return res.json({ success: true, message: "done" })
        }
        else if (order[0].status == 'confirmed') {
            order.map(async (item) => {
                let id = item._id
                let up_order = await OrderSchema.findByIdAndUpdate(id, { $set: { status: "packed" } }, { new: true })
                console.log(up_order, 2222222)
            })
            return res.json({ success: true, message: "done" })
        }
        else if (order[0].status == 'packed') {
            order.map(async (item) => {
                let id = item._id
                let up_order = await OrderSchema.findByIdAndUpdate(id, { $set: { status: "out for delivery" } }, { new: true })
                console.log(up_order, 3333333)
            })
            return res.json({ success: true, message: "done" })
        }
        else if (order[0].status == 'out for delivery') {
            order.map(async (item) => {
                let id = item._id
                let up_order = await OrderSchema.findByIdAndUpdate(id, { $set: { status: "completed" } }, { new: true })
                console.log(up_order, 4444444)
            })
            return res.json({ success: true, message: "done" })
        }
        else{
            return res.json({ success: true, message: "already done" })
        }
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}


module.exports = { ViewOrder, UpdateOrder }