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
            }
            else{
                html="No Packages Found"
            }
            DesiredDOMReference.existingpackages.innerHTML=html
        }

        return {
            loadPrePackages:loadPrePackages
        }
    }()
)
