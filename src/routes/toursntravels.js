const express=require('express')
let router=express.Router()
const toursntravelhandlers=require('../routehandlers/toursntravelshandler')

router.get('/',toursntravelhandlers.getPackages)
router.post('/',toursntravelhandlers.postPackages)

module.exports=router