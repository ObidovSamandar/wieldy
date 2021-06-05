const express = require('express')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const router = express.Router()

router.get('/',AuthMiddleware,(req,res)=>{
    res.status(200).json({
        ok:true
    })
})


module.exports = {
    path:'/main/dashboard/crypto',
    router
}