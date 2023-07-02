const express = require('express');
const AdminSchema = require('../Models/admin')
const ProductSchema = require('../Models/product')
const UserSchema = require('../Models/user')
const OrderSchema = require('../Models/order')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const Register = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body
        let admin = await AdminSchema.findOne({ email })
        if (admin) {
            return res.json({ success: false, message: "email already exist" })
        }
        let salt = await bcrypt.genSalt(10)
        let secPass = await bcrypt.hash(password, salt)
        admin = new AdminSchema({ name, email, phone, password: secPass })
        let savedAdmin = await admin.save()
        res.json({ success: true, savedAdmin })
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

const GetUser = async (req, res) => {
    try {
        let id = req.params.id;
        if (id) {
            let user = await UserSchema.findById(id);
            return res.json({ success: true, user })
        }
        else {
            let user = await UserSchema.find()
            res.json({ success: true, user })
        }
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

const Login = async (req, res) => {
    try {
        const { emailorphone, password } = req.body;
        let admin = await AdminSchema.findOne({ $or: [{ email: emailorphone }, { phone: emailorphone }] })
        // let admin = await AdminSchema.findOne({ email })
        if (!admin) {
            return res.json({ success: false, message: "Incorrect details" })
        }
        let passwordCompare = await bcrypt.compare(password, admin.password)
        if (!passwordCompare) {
            return res.json({ success: false, message: "Incorrect details" })
        }
        let data = {
            admin: {
                id: admin.id
            }
        }
        let authToken = await jwt.sign(data, process.env.JWT_SECRET)
        res.json({ success: true, authToken })
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

const InsertProduct = async (req, res) => {
    try {
        const { name, description, quantity, price, image } = req.body

        let product = new ProductSchema({ name, description, image, quantity, price })

        let savedproduct = await product.save()
        res.json({ success: true, savedproduct })
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

const ViewUser = async (req, res) => {
    try {
        let user_id = req.params.id
        if (user_id) {
            let user = await UserSchema.findById(user_id)
            res.json({ success: true, user })
        }
        else {
            let user = await UserSchema.find()
            res.json({ success: true, user })
        }
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}

const ViewProduct = async (req, res) => {
    try {
        let id = req.params.id
        if (id) {
            let product = await ProductSchema.findById(id)
            res.json({ success: true, product })
        }
        else {
            let product = await ProductSchema.find()
            res.json({ success: true, product })
        }
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}


module.exports = { Register, Login, ViewProduct, InsertProduct, ViewUser, GetUser }