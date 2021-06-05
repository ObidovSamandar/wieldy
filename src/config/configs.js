const path = require('path')

require('dotenv').config({path:path.join(__dirname,'../','.env')})


const configs = {
    HTTP_PORT: getConfig('HTTP_PORT',''),
    MongoDB_URI: getConfig('MONGODB_URI',''),
    JWT_SECRET_WORD: getConfig('JWT_SECRET_WORD','')
}


function getConfig(name, dbinfo=""){
    if(process.env[name]){
        return process.env[name] || ""
    }

    return dbinfo
}

module.exports = configs