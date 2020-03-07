const LoadInitials=(
    function() {
        let cachedDOM={}
        let urls={
            endpoint:"localhost:0786//",
            loadPrePackages:'toursntravels'
        }
        function init(){
            cachedDOM=cacheDOM()
            cachedDOMEventBinder()
        }

        function cacheDOM(){
            return {
                addpackagebtn:document.getElementById('addpackagebtn'),
                packageContainer:document.getElementById('packageContainer'),
                existingpackages:document.getElementById('existingpackages'),
                btnsavepackage:document.getElementById('btnsavepackage')
            }
        }

        function cachedDOMEventBinder(){
            cachedDOM.addpackagebtn.addEventListener('click',AddPackageModule.addPackage.bind(this))
            cachedDOM.btnsavepackage.addEventListener('click',AddPackageModule.SavePackage.bind(this))
        }

        function makeGETajax(u,q) {            
            let url=new URL(urls.endpoint+u)        
            if(q){
                Object.keys(q).map(function(key){
                    debugger;
                    url.searchParams.append(key,q[key])
                })
            }
            debugger;
            return fetch(url)
        }

        function makePOSTajax(u,q){
            return fetch(urls.endpoint+u,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                    
                },
                body:JSON.stringify(q)
            })
        }

        function getJSON(res) {
            return res.json()
        }
        
        function getDOM() {
            return cachedDOM
        }
        function getURLS() {
            return urls
        }
        return {
            cacheDOM:getDOM,
            urls:getURLS,
            makeGETajax:makeGETajax,
            makePOSTajax:makePOSTajax,
            getJSON:getJSON,
            init:init
        }
    }()
)



