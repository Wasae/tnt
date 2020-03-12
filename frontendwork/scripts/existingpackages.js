 const LoadInitialPackages=(
    function(){
        let deps=LoadInitials
        let DesiredDOMReference        

        function getModuleNeeds(){
            DesiredDOMReference=LoadInitials.cacheDOM()
            urls=LoadInitials.urls().loadPrePackages
        }

        function loadPrePackages() {
            getModuleNeeds()
            getPrePackages()
        }

        function getPrePackages(params) {        
            deps.makeGETajax('toursntravels')
            .then(deps.getJSON)
            .then(handlePreLoadedPackaged)            
        }

        function BindGeneratedTableEvents() {
            let tableClassEvents=[
                {
                    classname:"tbleditbtn",
                    eventtype:"click",
                    event:editPackage
                },
                {
                    classname:"tbldeletebtn",
                    eventtype:"click",
                    event:deletePackage
                }
            ]            
            for (let j = 0; j < tableClassEvents.length; j++) {                
                PacakgeEventBinders(tableClassEvents[j])
            }            
        }

        function editPackage() {                   
            let target=event.target
            if(target.hasAttribute("data-pkgid")){                
                let pkgid=target.attributes["data-pkgid"].value
                if (pkgid) {
                    LoadInitials.makeGETajax('toursntravels/'+pkgid)
                    .then(LoadInitials.getJSON)
                    .then(EditPackage)   
                }
            }
        }
     
        function EditPackage(d) {            
            if (d.resultstatus) {
                alert("Package Modified Successfully")
                AddPackageModule.addPackage(d.result)   
                return
            }            
            alert("Error Modifying Package, Please try again later")
            return
        }

        function deletePackage() {
            let target=event.target
            if(target.hasAttribute("data-pkgid")){
                let pkgid=target.attributes["data-pkgid"].value
                if (pkgid) {                    
                    if(confirm("do you want to delete this package .. ?")){
                        //ajax for delete
                        LoadInitials.makeDELETEajax('toursntravels',{"id":pkgid})
                        .then(LoadInitials.getJSON)
                        .then(DeletePacakage)   
                    }
                }
            }
        }

        function DeletePacakage(d) {
            if (d.resultstatus) {
                alert("Deleted Successfully")
                getPrePackages()
                return
            }
            alert("Error Deleting, Please try again later")
            return
        }

        function PacakgeEventBinders(params) {
            let btns= document.getElementsByClassName(params.classname)
            if(btns && btns.length!=0){
                for (let ii = 0; ii < btns.length; ii++) {
                    btns[ii].addEventListener(params.eventtype,params.event)
                }
            }
        }
        function handlePreLoadedPackaged(d) {
            if(d.resultStatus){                
                // dirt here
                DesiredDOMReference.existingpackages.style.display=""
                DesiredDOMReference.packageContainer.style.display="none"
                DesiredDOMReference.btnsavepackage.style.display="none"
                //dirt here ends
    
                let html=""
                let columns=["#","Title","Price","Edit","Delete"]
                let dataprops=["packageid","title","price"]  
                if (d.result && d.result.length!=0) {                    
                    html=existingPackageHelper.init(d.result,columns,dataprops)  
                    DesiredDOMReference.existingpackages.innerHTML=html 
                    BindGeneratedTableEvents()
                }
                else{
                    DesiredDOMReference.existingpackages.innerHTML="No Packages Found"
                }
            }                                    
        }

        return {
            loadPrePackages:loadPrePackages
        }
    }()
)
