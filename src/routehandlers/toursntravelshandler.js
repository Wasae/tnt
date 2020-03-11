let fs=require("fs")
let path=require('path')
let filepath=path.join(__dirname,'../file','data.json')
const getAllToursInfo=(req,res)=>{
    try {         
        const data=fs.readFileSync(filepath).toString('utf8') || []
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
            const data=fs.readFileSync(filepath).toString('utf8')
            data=JSON.parse(data) || []
            data.push(req.body)
            let packagejson=JSON.stringify(data)
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

const getPackageById=(req,res)=>{
    try {
        if(req.query.id){
            res.json(400).json({
                resultstatus:false,
                result:'invlaid id'    
            })
        }
        let data=fs.readFileSync(filepath).toString('utf8')
        data =JSON.parse(data) || []
        if(data){            
            let package=data.find((pkg)=>{return pkg.packageid ==req.query.id})
            if (package) {
                res.status(200).json({
                    resultstatus:true,
                    result:package
                })
            }
        }
        res.status(200).json({
            resultstatus:false,
            result:"Package not found"
        })        
    }catch (error) {
        res.status(500).json({
            resultstatus:false,
            result:error
        })
    }
}

module.exports={
    getPackages:getAllToursInfo,
    postPackages:postAllToursInfo,
    getPackageById:getPackageById
}