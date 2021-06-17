const mongoose = require('mongoose')
const configs = require('../config/configs')

module.exports = async function (){
    return await mongoose.connect(configs.MongoDB_URI || "mongodb://localhost/wieldy", {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
    })
}

