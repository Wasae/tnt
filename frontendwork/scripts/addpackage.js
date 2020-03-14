const AddPackageModule=(
    function(){    
		let filesArray=[]	
        let dynamicFileUploadControl;
		
        let deps=packageGenerator
        let  DesiredDOMReference={}
        let urls={
            postPackaged:"toursntravels"
        }
        function getDesiredDOM(){
            let dom=LoadInitials.cacheDOM()
            DesiredDOMReference={
                packageContainer:dom.packageContainer,
                btnsavepackage:dom.btnsavepackage,
                existingpackages:dom.existingpackages,
                btnBack:dom.btnBack,
                btnsavepackage:btnsavepackage
            }
        }
		
		 function getFileUploadControl() {            	
            dynamicFileUploadControl=document.getElementsByClassName('fileuploadcontrol')[0]	
            if(dynamicFileUploadControl){	
                dynamicFileUploadControl.addEventListener('change',ToBase64)	
            }	
        }
		
		function ToBase64() {            
            let target=event.target            	
            if (target) {	
                let files=target.files	
                if(files && files.length!=0){	
                    for (let j = 0; j < files.length; j++) {	
                        const element = files[j];	
                        let reader=new FileReader()	
                        reader.onload=()=>{	
                            filesArray.push(reader.result)	
                        }	
                        reader.readAsDataURL(element)    	
                    }                    	
                }	
                	
            }	
        }

        function BackClicked() {
            //dirt here 
            DesiredDOMReference.btnBack.style.display="none"
            DesiredDOMReference.packageContainer.innerHTML=""
            //dirt here ends
            LoadInitialPackages.loadPrePackages()
        }

        function addPackage(d){
            getDesiredDOM()   
            if(DesiredDOMReference.packageContainer.children.length==0){
                //dirt here
                DesiredDOMReference.existingpackages.style.display="none"
                DesiredDOMReference.btnsavepackage.style.display=""
                DesiredDOMReference.btnBack.style.display=""                
                //dirt here ends
                if (d) {
                    appendPackageHTML(newPackagehtmlgenerator(d))    
                }
                else{
                    appendPackageHTML(newPackagehtmlgenerator())    
                }
                
            }
            SavingButtonCriteria()            
			getFileUploadControl()
        }

        function newPackagehtmlgenerator(d){            
            return deps.getNewPackageHTML(d)
        }

        function appendPackageHTML(html){
            DesiredDOMReference.packageContainer.style.display=""
            DesiredDOMReference.packageContainer.innerHTML+=html            
            DynamicEventBinder()
        }

        function SavingButtonCriteria() {
            if(document.getElementById('packageContainer').children.length!=0){
                DesiredDOMReference.btnsavepackage.style.display=""
            }
            else{
                DesiredDOMReference.btnsavepackage.style.display="none"
            }                        
        }

        function SavePackage() {
            let packages=DesiredDOMReference.packageContainer.children
            if (packages && packages.length) {                
                LoadInitials.makePOSTajax(urls.postPackaged,finalObjectCreation(packages))
                .then(LoadInitials.getJSON)
                .then(handleAfterPackageSave)
                .catch(function(e) {
                    LoadInitialPackages.loadPrePackages()
                    // dirt here
                    DesiredDOMReference.existingpackages.style.display=""
                    DesiredDOMReference.packageContainer.innerHTML=""
                    DesiredDOMReference.packageContainer.style.display="none"
                    DesiredDOMReference.btnBack.style.display="none"
                    DesiredDOMReference.btnsavepackage.style.display="none"
                    // dirt here ends
                    alert("Error Saving Package, Please try again")
                })
            }
            else{
                alert("No Package found to be deleted")
                return
            }
        }

        function finalObjectCreation(packages) {
            let finalobject=[]
            for (let i = 0; i < packages.length; i++) {
                const element = packages[i];
                let pkgid=element.attributes["id"].value                    
                                
                var title=document.getElementById("pkgtitle_"+pkgid).value; 
                var price=document.getElementById("pkgprice_"+pkgid).value;                     
                
                let inclusions=document.getElementById('pkginclusion_'+pkgid).getElementsByTagName('input')
                if (inclusions && inclusions.length!=0) {
                    inclusions=Array.from(inclusions,(d)=>{
                        return d.value
                    })    
                }
                else{
                    inclusions=[]
                }

                let accomodation=document.getElementById('pkgaccomodations_'+pkgid).getElementsByTagName('input')
                if (accomodation && accomodation.length!=0) {
                    accomodation=Array.from(accomodation,(d)=>{
                        return d.value
                    })    
                }
                else{
                    accomodation=[]
                }
                
                let daydescription=document.getElementById('pkgdaywisedescription_'+pkgid).getElementsByTagName('textarea')
                if (daydescription && daydescription.length!=0) {
                    daydescription=Array.from(daydescription,(d)=>{
                        return d.value
                    })    
                }
                else{
                    daydescription=[]
                }   
                
                // pkgfileupload_
				var files=filesArray
                finalobject.push({
                     files:files,
                     packageid:pkgid,
                     title:title,
                     price:price,
                     inclusions:inclusions,
                     accomodation:accomodation,
                     totaldays:daydescription.length,
                     daydescription:daydescription
                 })                                   
            }            
            return finalobject
        }

        function handleAfterPackageSave(d) {
            if(d.resultstatus){
                console.log('Packages Saved')
                // dirt here
                DesiredDOMReference.existingpackages.style.display=""
                DesiredDOMReference.packageContainer.innerHTML=""
                DesiredDOMReference.packageContainer.style.display="none"
                DesiredDOMReference.btnBack.style.display="none"            
                // dirt here ends
    
                alert("Package Saved Successfully")
                LoadInitialPackages.loadPrePackages()
                return 
            }
            alert("Error Adding Package, Please try again later")
            
        }


        //this is Dirty stuff ,will try to clean it
        function DynamicEventBinder(params) {
            let classes=[{
                classname:"removePackage",
                eventtype:"click",
                event:removePackage
            },
            {
                classname:"addaccomodation",
                eventtype:"click",
                event:addaccomodation
            },
            {
                classname:"addinclusion",
                eventtype:"click",
                event:addinclusion
            },
            {
                classname:"removeinc",
                eventtype:"click",
                event:removeinclusion
            },
            {
                classname:"addday",
                eventtype:"click",
                event:addday
            }
            ]
            for (let jj = 0; jj < classes.length; jj++) {
                PacakgeEventBinders(classes[jj]);
            }            
        }

        function PacakgeEventBinders(params) {
            let btns= document.getElementsByClassName(params.classname)
            if(btns && btns.length!=0){
                for (let ii = 0; ii < btns.length; ii++) {
                    btns[ii].addEventListener(params.eventtype,params.event)
                }
            }
        }

        function removePackage() {
            if(confirm("Do you want to delete this Package..??")){
                this.closest('fieldset').remove()
                SavingButtonCriteria()
            }
            return
        }

        function addaccomodation() {                        
            getDOM(deps.addaccomodation(),this.previousElementSibling)
            DynamicEventBinder()
        }

        function addinclusion() {            
           getDOM(deps.addinclusion(), this.previousElementSibling)
            DynamicEventBinder()
        }

        function removeinclusion() {
            this.closest('div').remove()
        }

        function addday() {                       
            getDOM(deps.addday(),this.previousElementSibling)
            DynamicEventBinder()
        }

        function getDOM(str,d) {
            var doc = new DOMParser().parseFromString(str, "text/html");            
            d.appendChild(doc.body.firstElementChild)
        }

        return {
            addPackage:addPackage,
            SavePackage:SavePackage,
            BackClicked:BackClicked
        }
    }()
)
