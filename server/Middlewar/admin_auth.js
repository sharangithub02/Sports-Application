const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const FetchAdmin = async (req,res,next)=>{
    let token = req.header('auth-token');
        // console.log("token-auth " +token)
        if(!token){
            return res.status(401).send({message: "please authenticate using a valid token1"})
        }
    try{
        const data = await jwt.verify(token, process.env.JWT_SECRET)
        req.admin = data.admin
        next()
    }
    catch (err) {
        res.status(401).send({message: " catch please authenticate using a valid token2"})
        console.log(err)
    }
}

module.exports=FetchAdmin