const LoadInitials=(
    function() {
        let cachedDOM={}
        let urls={
            endpoint:"http://localhost:0786/",
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
                btnsavepackage:document.getElementById('btnsavepackage'),
                btnBack:document.getElementById('btnBack')
            }
        }

        function cachedDOMEventBinder(){
            cachedDOM.addpackagebtn.addEventListener('click',AddPackageModule.addPackage.bind(this))
            cachedDOM.btnsavepackage.addEventListener('click',AddPackageModule.SavePackage.bind(this))
            cachedDOM.btnBack.addEventListener('click',AddPackageModule.BackClicked.bind(this))
        }

        function makeGETajax(u,q) {            
            let url=new URL(urls.endpoint+u)        
            if(q){
                Object.keys(q).map(function(key){
                    debugger;
                    url.searchParams.append(key,q[key])
                })
            }            
            return fetch(url)
        }

        function makePOSTajax(u,q){
            return fetch(urls.endpoint+u,{
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    "postman-token": "d0ac01aa-d9ee-862f-1152-bc56a9786847"
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



