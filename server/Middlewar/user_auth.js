const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// const JWT_SECRET = 'hello'
dotenv.config()

const FetchUser = async (req,res,next)=>{
    let token = req.header('auth-token');
        if(!token){
            return res.status(401).send({message: "please authenticate using a valid token"})
        }
    try{
        const data = await jwt.verify(token, process.env.JWT_SECRET)
        // const data = await jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    }
    catch (err) {
        res.status(401).send({message: " catch please authenticate using a valid token"})
        console.log(err)
    }
}

module.exports=FetchUser