// default imports
let express=require('express')
let app=express()
let bodyparser=require('body-parser')
let url=require('url')
//custom imports
let toursntravels=require('./routes/toursntravels')
let cors=require('cors')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json({limit:'5mb'}))
app.use(cors())
app.use('/toursntravels',toursntravels)

module.exports=app