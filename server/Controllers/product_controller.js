const express = require('express');
const AdminSchema = require('../Models/admin')
const ProductSchema = require('../Models/product')
const UserSchema = require('../Models/user')
const OrderSchema = require('../Models/order')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()



const UpdateProduct = async (req, res) => {
    try {
        let id = req.params.id;
        const { name, description, price, quantity,image } = req.body
        let product = await ProductSchema.findById(id)
        if (!product) {
            return res.json({ success: false, message: "product Not Found!!!" })
        }
        let newproduct = {}
        if (name) { newproduct.name = name }
        if (description) { newproduct.description = description }
        if (price) { newproduct.price = price }
        if (quantity) { newproduct.quantity = quantity }
        if (image) { newproduct.image = image }
        let updatedproduct = await ProductSchema.findByIdAndUpdate(id, { $set: newproduct }, { new: true })
        res.json({ success: true, updatedproduct })
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

const DeleteProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let product = await ProductSchema.findById(id);
        if (!product) {
            res.json({ success: false, message: "product Not Found!!!" })
        }
        let deleteproduct = await ProductSchema.findByIdAndDelete(id)
        return res.json({ success: true, deleteproduct })
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

module.exports = { UpdateProduct, DeleteProduct }