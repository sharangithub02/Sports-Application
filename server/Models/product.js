const express = require('express')
const mongoose = require('mongoose')
const {Schema} = mongoose

const ProductSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("product", ProductSchema)