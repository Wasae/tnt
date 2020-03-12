 const LoadInitialPackages=(
    function(){
        let deps=LoadInitials
        let DesiredDOMReference
        let urls

        function getModuleNeeds(){
            DesiredDOMReference=LoadInitials.cacheDOM()
            urls=LoadInitials.urls().loadPrePackages
        }

        function loadPrePackages() {
            getModuleNeeds()
            getPrePackages()
        }

        function getPrePackages(params) {        
            // deps.makeGETajax(urls,{"name":"wasae"})
            // .then(deps.getJSON)
            // .then(handlePreLoadedPackaged)
            let d=[
                {"srno":1,"title":"Package 1","price":"1000"},
                {"srno":2,"title":"Package 2","price":"2000"},
                {"srno":3,"title":"Package 3","price":"3000"}
            ]
            handlePreLoadedPackaged(d)
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
            debugger;
            let target=event.target
            if(target.hasAttribute("data-pkgid")){
                let pkgid=target.attributes["data-pkgid"].value
                //getPackageForThisId

            }
            console.log(event)
        }

        function deletePackage() {
            debugger;
            console.log(event)
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
            // dirt here
            DesiredDOMReference.existingpackages.style.display=""
            DesiredDOMReference.packageContainer.style.display="none"
            DesiredDOMReference.btnsavepackage.style.display="none"
            //dirt here ends

            let html=""
            let columns=["#","Title","Price","Edit","Delete"]
            let dataprops=["srno","title","price"]  
            if (d && d.length!=0) {
                html=existingPackageHelper.init(d,columns,dataprops)  
                DesiredDOMReference.existingpackages.innerHTML=html 
                BindGeneratedTableEvents()
            }
            else{
                DesiredDOMReference.existingpackages.innerHTML="No Packages Found"
            }            
        }

        return {
            loadPrePackages:loadPrePackages
        }
    }()
)
