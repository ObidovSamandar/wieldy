const express = require('express')
const cors = require('cors')
const helmet  = require('helmet')
// const morgan = require('morgan')
const configs = require('./config/configs')
const app = express()
const db = require('./store/mongo')
const { glob } = require('glob')


// app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(cors())

;(async _=>{
    try {
        await db()
        console.log('Database connection established')
    } catch (e) {
        console.log(e)        
    }
})();

let PORT = configs.PORT || 3000
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`))


glob('**/*Route.js', {realpath:true},(err, files)=>{
    files.forEach( (file) =>{
        let innerFile = require(file)
        app.use(innerFile.path, innerFile.router)
    })
})


