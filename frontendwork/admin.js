let adminmodule=(function(){
    let cachedDOM={};

    function init(){
        cachedDOM=cacheDOM()
        cachedDOMEventBinder()
    }

    function cacheDOM(){
        return {
            addpackagebtn:document.getElementById('addpackagebtn'),
            packageContainer:document.getElementById('packageContainer')
        }
    }

    function cachedDOMEventBinder(){
        cachedDOM.addpackagebtn.addEventListener('click',addPackage)
    }

    function addPackage(){              
        appendPackageHTML(newPackagehtmlgenerator())
    }

    function newPackagehtmlgenerator(){
        // image uploader
        // days with description
        return ""
    }

    function appendPackageHTML(html){
        cachedDOM.packageContainer.innerHTML+=html
    }

    return {
        conquerpage:init
    }
}())