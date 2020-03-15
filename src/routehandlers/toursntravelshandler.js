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
            let body=req.body[0]
            let data=fs.readFileSync(filepath).toString('utf8')
            if(data){
                data=JSON.parse(data) || []
            }
            else{
                data=[]
            }
            
            let finder=data.find((x)=>x.packageid == body.packageid)
            if(finder){
                let ix=data.indexOf(finder)
                if(ix!=-1){
                    data[ix]=body
                }
            }
            else{
                data.push(body)
            }
            
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
        let id =req.params.id
        if(!id){
            res.json(400).json({
                resultstatus:false,
                result:'invlaid id'    
            })
        }
        let data=fs.readFileSync(filepath).toString('utf8')
        data =JSON.parse(data) || []
        if(data){            
            let package=data.find((pkg)=>{return pkg.packageid ==id})
            if (package) {
                res.status(200).json({
                    resultstatus:true,
                    result:package
                })
            }
        }
        else{
            res.status(200).json({
                resultstatus:false,
                result:"Package not found"
            })       
        }
    }catch (error) {
        res.status(500).json({
            resultstatus:false,
            result:error
        })
    }
}

const deletePackageByid=(req,res)=>{
    try {
        const id=req.body.id
        if(!id){
            res.json(400).json({
                resultstatus:false,
                result:'invlaid id'    
            })
        }
        else{
            let data=fs.readFileSync(filepath).toString('utf8')
            data =JSON.parse(data) || []
            if(data){            
                let package=data.find((pkg)=>{return pkg.packageid ==id})
                if (package) {
                    let ix=data.indexOf(package)
                    if(ix!=-1){
                        data.splice(ix,1)
                        let filedata=JSON.stringify(data)  || []
                        fs.writeFileSync(filepath,filedata)
                        res.status(200).json({
                            resultstatus:true,
                            result:"Package deleted"        
                        })
                    }
                    else{
                        res.status(200).json({
                            resultstatus:false,
                            result:"Package not found"
                        })        
                    }
                }
            }
            else{
                res.status(200).json({
                    resultstatus:false,
                    result:"Package not found"
                })        
            }
        } 
    } catch (error) {
        res.status(200).json({
            resultstatus:false,
            result:error
        })         
    }  
}
module.exports={
    getPackages:getAllToursInfo,
    postPackages:postAllToursInfo,
    getPackageById:getPackageById,
    deletePackageByid:deletePackageByid
}