const { verifyToken } = require("../modules/jwt")

module.exports = async (req, res, next)=>{
    try {
        const token = req.headers['authorization']
        if(!token) throw new Error('Token not found')
        let verificationToken = verifyToken(token)
        if(!verificationToken) throw new Error('Token is invalid')
        next()
    } catch (e) {
        res.status(401).json({
            ok:false,
            message: e+" "
        })
    }
}