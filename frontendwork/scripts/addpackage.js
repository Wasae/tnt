const AddPackageModule=(
    function(){    
        let deps=packageGenerator
        let  DesiredDOMReference={}
        function getDesiredDOM(){
            let dom=LoadInitials.cacheDOM()
            DesiredDOMReference={
                packageContainer:dom.packageContainer,
                btnsavepackage:dom.btnsavepackage
            }
        }

        function addPackage(){
            getDesiredDOM()                      
            appendPackageHTML(newPackagehtmlgenerator())
            SavingButtonCriteria()
        }

        function newPackagehtmlgenerator(){
            return deps.getNewPackageHTML()
        }

        function appendPackageHTML(html){
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
            let packages=document.getElementById('packageContainer').children
            if (packages && packages.length) {                
                LoadInitials.makePOSTajax(finalObjectCreation())
                .then(LoadInitials.getJSON)
                .then(handleAfterPackageSave)
            }
            else{
                alert("No Package found to be deleted")
                return
            }
        }

        function finalObjectCreation(params) {
            let finalobject=[]
            for (let i = 0; i < packages.length; i++) {
                const element = packages[i];
                let pkgid=element.attributes["id"].value                    
                
                // pkgfileupload_

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
                
                finalobject.push({
                     //image remaining
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
            console.log('Packages Saved')
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
            this.previousElementSibling.innerHTML+=deps.addaccomodation()
            DynamicEventBinder()
        }

        function addinclusion() {
            this.previousElementSibling.innerHTML+=deps.addinclusion()
            DynamicEventBinder()
        }

        function removeinclusion() {
            this.closest('div').remove()
        }

        function addday() {
            this.previousElementSibling.innerHTML+=deps.addday()
            DynamicEventBinder()
        }

        return {
            addPackage:addPackage,
            SavePackage:SavePackage
        }
    }()
)
