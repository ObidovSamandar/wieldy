const UserModel = require('../model/UserModel')
const { generateHashPassword, compareHashPassword } = require('../modules/bcrypt')
const { signToken } = require('../modules/jwt')
const { UserRegisterValidate,UserLoginalidate } = require('../validation/UserValidation')


async function register(req,res){
    try {
        let validateUserItems = await UserRegisterValidate.validateAsync(req.body)
        let create = await UserModel.create({
            fullname: validateUserItems.fullname,
            email: validateUserItems.email,
            password: generateHashPassword(validateUserItems.password)
        })
        res.status(200).json({
            ok:true,
            user:{
                id:create._id,
                fullname:create.fullname
            }
        })
    } catch (e) {
        res.status(201).json({
            ok:false,
            message: e+" "
        })
    }
}

async function login(req,res){
    try {
        let validateLoginUser = await UserLoginalidate.validateAsync(req.body)
        let findUserEmail = await UserModel.findOne({email:validateLoginUser.email})
        if(!findUserEmail) throw new Error('User not found')
        console.log(validateLoginUser.password,findUserEmail.password)
        if(!compareHashPassword(validateLoginUser.password,findUserEmail.password)) throw new Error('Password is incorrect')
        let token = await signToken({
            id:findUserEmail._id
        })
        res.status(200).json({
            ok:true,
            token
        })
    } catch (e) {
        res.status(401).json({
            ok:false,
            message:e+""
        })
    }
}


module.exports = {
    register,
    login
}