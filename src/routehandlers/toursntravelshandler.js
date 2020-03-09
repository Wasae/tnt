const getAllToursInfo=(req,res)=>{
    try {
        let testingarray=[{
            //image remaining
            packageid:1,
            title:"Package 1",
            price:8500,
            inclusions:["Inclusion 1","Inclusion 2","Inclusion 3"],
            accomodation:["accomodation 1","accomodation 2","accomodation 3"],
            totaldays:3,
            daydescription:["daydescription 1","daydescription 2","daydescription 3"]
        },
        {
            //image remaining
            packageid:1,
            title:"Package 2",
            price:1000,
            inclusions:["Inclusion 11","Inclusion 22","Inclusion 33"],
            accomodation:["accomodation 11","accomodation 22","accomodation 33"],
            totaldays:3,
            daydescription:["daydescription 11","daydescription 22","daydescription 33"]
        }
    ]    
    
        res.status(200).json({
            resultStatus:true,
            result:testingarray
        })   
    } catch (error) {
        res.status(500).json({
            resultStatus:false,
            result:error
        })
    }
}

const postAllToursInfo=(req,res)=>{
    res.send(JSON.stringify(req.body))
}

module.exports={
    getPackages:getAllToursInfo,
    postPackages:postAllToursInfo
}