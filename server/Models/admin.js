const express = require('express')
const mongoose = require('mongoose')
const {Schema} = mongoose

const AdminSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Admin", AdminSchema)