let fs=require("fs")
let path=require('path')
let filepath=path.join(__dirname,'../file','data.json')
const getAllToursInfo=(req,res)=>{
    try {         
        const data=fs.readFileSync(filepath).toString('utf8')
        res.status(200).json({
            resultStatus:true,
            result:JSON.parse(data)
        })   
    } catch (error) {
        res.status(500).json({
            resultStatus:false,
            result:error
        })
    }
}

const postAllToursInfo=(req,res)=>{
    try {
        if(req.body && req.body.length!=0){
            let packagejson=JSON.stringify(req.body)
            fs.writeFileSync(filepath,packagejson)
            return res.status(200).json({
                resultstatus:true,
                resultmessage:"Pacakge Saved Successfully"    
            })
        }        
    } catch (error) {
        res.status(500).json({
            resultstatus:false,
            resultmessage:"Some Error Occurred"
        })
    }    
}

module.exports={
    getPackages:getAllToursInfo,
    postPackages:postAllToursInfo
}