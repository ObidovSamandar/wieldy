const express = require('express')
const cors = require('cors')
const helmet  = require('helmet')
const morgan = require('morgan')
const configs = require('./config/configs')
const app = express()
const db = require('./store/mongo')
const { glob } = require('glob')
const proxy = require('express-http-proxy')

const allowedOrigins = ['http://localhost:3000',
  'https://nodir-wieldy.netlify.app/'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use('/users/login',proxy('https://nodir-wieldy.netlify.app/sign-in'))
;(async _=>{
    try {
        await db()
        console.log('Database connection established')
    } catch (e) {
        console.log(e)        
    }
})();
glob('**/*Route.js', {realpath:true},(err, files)=>{
    files.forEach( (file) =>{
        let innerFile = require(file)
        app.use(innerFile.path, innerFile.router)
    })
})
app.listen(configs.HTTP_PORT, console.log(`SERVER RUNNING ON PORT ${configs.HTTP_PORT}`))

