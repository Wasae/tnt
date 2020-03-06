const getAllToursInfo=(req,res)=>{
    res.send('Setup initialized')
}

const postAllToursInfo=(req,res)=>{
    res.send(JSON.stringify(req.body))
}

module.exports={
    getPackages:getAllToursInfo,
    postPackages:postAllToursInfo
}