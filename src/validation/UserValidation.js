const joi = require('joi')


const UserRegisterValidate = joi.object({
    fullname:joi.string()
             .required()
             .error(new Error('Full name is invalid')),
    email: joi.string().email()
            .required()
            .error(new Error("Email is invalid")),
    password: joi.string()
              .required()
              .error(new Error('Password is invalid'))
})



const UserLoginalidate = joi.object({
    email: joi.string().email()
            .required()
            .error(new Error("Email is invalid")),
    password: joi.string()
              .required()
              .error(new Error('Password is invalid'))
})

module.exports = {
    UserLoginalidate,
    UserRegisterValidate
}