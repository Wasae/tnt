// default imports
let express=require('express')
let app=express()

//custom imports
let toursntravels=require('./routes/toursntravels')
let cors=require('cors')

app.use(cors())
app.use('/toursntravels',toursntravels)

module.exports=app