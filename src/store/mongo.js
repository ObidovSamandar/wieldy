const mongoose = require('mongoose')
const configs = require('../config/configs')

module.exports = async function (){
    return await mongoose.connect(configs.MongoDB_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
    })
}

