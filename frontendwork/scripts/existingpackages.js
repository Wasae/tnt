const LoadInitialPackages=(
    function(){
        let DesiredDOMReference
        let urls

        function getModuleNeeds(){
            DesiredDOMReference=LoadInitials.cacheDOM().existingpackages
            urls=LoadInitials.urls().loadPrePackages
        }

        function loadPrePackages() {
            getModuleNeeds()
            getPrePackages()
        }

        function getPrePackages(params) {        
            // LoadInitials.makeGETajax(urls,{"name":"wasae"})
            // .then(LoadInitials.getJSON)
            // .then(handlePreLoadedPackaged)
        }

        function handlePreLoadedPackaged(d) {
            console.log(d)
        }

        return {
            loadPrePackages:loadPrePackages
        }
    }()
)
