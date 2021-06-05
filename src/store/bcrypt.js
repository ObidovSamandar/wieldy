const bcrypt = require('bcrypt')

function generateHashPassword(password){
    return bcrypt.hashSync(password,10)
}

function compareHashPassword(password,hashPassword){
    return bcrypt.compareSync(password,hashPassword)
}

module.exports = {
    generateHashPassword,
    compareHashPassword
}