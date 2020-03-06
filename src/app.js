// default imports
let express=require('express')
let app=express()

//custom imports
let toursntravels=require('./routes/toursntravels')

app.use('/toursntravels',toursntravels)

module.exports=app