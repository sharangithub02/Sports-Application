const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose

const ShippingSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    shipping_no:{
        type: String,
        required: false,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
    },
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    pin_code: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("shipping", ShippingSchema)