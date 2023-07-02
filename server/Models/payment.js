const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose

const PaymentSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    order_no: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: false,
    },
    payment_type: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("payment", PaymentSchema)