let pacakgeGenerator=(function(){
    function formTitle(t) {
        return "<h2 id='manali' class='font-weight-light text-black mb-4 hr-primary usama'>"+t+"Days</h2>"
    }

    function formPrice(p) {
        return "<h6 class='font-weight-light text-black mb-4 hr-danger'>Rs. "+p+"/- Only</h6>"
    }

    function formInclusions(incs) {
        let inclusionHTML=""
        if(incs && incs.length!=0){
            inclusionHTML+="<p class='hr-danger2 align-items-center'>Inclusion</p><p class='hr-success'>"
            inclusionHTML+="<ul class='list-unstyled hr-primary'>"
            inclusionHTML+=(incs.map((d)=>{
              return "<li class='d-flex align-items-center'><span class='icon-check2 text-primary h3 mr-2'></span><span>"+d+"</span></li>"
            })).join('')              
            inclusionHTML+="</ul>"
        }
        return inclusionHTML
    }

    function formAccomodations(a) {
        let accomodationHTML=""
        if(a && a.length!=0){
          accomodationHTML+="<p class='hr-danger2 align-items-center'>Accomodation</p><p class='hr-success'>"
          accomodationHTML+="<ul class='list-unstyled hr-primary'>"
          accomodationHTML+= (a.map((d)=>{
              return "<li class='d-flex align-items-center'><span class='icon-compass text-primary h3 mr-2'></span><span>"+d+"/span></li>"
            })).join('')
          accomodationHTML+="</ul>"
        }
        return accomodationHTML
    }

    function formDayWiseDescription(dd,t) {
      let daydescriptionHTML=""
      if(dd && dd.length !=0){
        daydescriptionHTML+=(dd.map((d,ix)=>{          
          return "<p class='hr-danger2 align-items-center'>Day "+(ix+1)+": "+t+"</p><p class='hr-success'>"+d+"</p>"
        })).join('')
      }
      return daydescriptionHTML
    }

    function formImageHTML(imgs) {
        let imgHTML=""
        if(imgs && imgs.length!=0){
            imgHTML+=imgs.map((d)=>{
                return "<div style='height: 450px;'></div><img src='images/tours/manali62.jpg' alt='Image' class='img-fluid rounded' />"
            })
        }
        return imgHTML
    }

    function PackageHTML(package) {
        let packageHTML=""
        packageHTML+="<div class='container'>"
            packageHTML+="<div class='row align-items-center'>"
                packageHTML+="<div class='col-md-4 mb-5 mb-md-0'>"
                    packageHTML+="<img src='images/tours/manali61.jpg' alt='Image' class='img-fluid rounded'>"//will have to change image
                    packageHTML+="<div id='tripImages6' style='display: none;'>"        
                        packageHTML+=formImageHTML()
                    PackageHTML+="</div>"
                PackageHTML+="</div>"
                    packageHTML+="<div class='col-md-6 pl-md-5'>"
                        packageHTML+=formTitle(package.title)
                        packageHTML+=formPrice(package.price)
                            packageHTML+="<div style='display: none;'>"
                                packageHTML+=formDayWiseDescription(package.daydescription,package.title)
                                packageHTML+=formInclusions(package.inclusions)
                                packageHTML+=formAccomodations(package.accomodation)
                            PackageHTML+="</div>"
                    PackageHTML+="</div>"                
            PackageHTML+="</div>"
        PackageHTML+="</div>"
        PackageHTML+="<hr class='new5'>"
        return PackageHTML
    }

    function AllPackagesHTML(pacakges) {
        let html=""
        if (packages && packages.length!=0) {
          html+=packages.map((p)=>{
                    return PackageHTML(p)
                }).join('')
        }
        return html
    }

    return {
      getHTMLforPackages:AllPackagesHTML
    }
}())

let renderPackages=(function(){
    let DOMReference
    let urls={
      endpoint:"",
      getPackages:""
    }
    function usamaVisibility() {
          let target=event.target
          let sty=target.nextElementSibling.nextElementSibling.style.display
          var d=target.parentElement.previousElementSibling
          d=d.getElementsByTagName('div')[0]

          if(sty!='none'){
            event.target.nextElementSibling.nextElementSibling.style.display="none"
            d.style.display="none" 
          }
          else{
            event.target.nextElementSibling.nextElementSibling.style.display="block"
            d.style.display="block"
          }
    }

    function CacheDOM() {
        return {
            usamaclass:document.getElementsByClassName('usama')
        }        
    }

    function bindDOMEvents() {
        let elements=DOMReference.usamaclass
        if (elements && elements.length!=0) {
            for (let j = 0; j < elements.length; j++) {
                const element = elements[j];
                element.addEventListener('click',usamaVisibility)
            }
        }
    }

    function getPackages() {
      makeGETajax(urls.getPackages)
      .then(getJSON)
      .then(packagesHandler)
      .catch(logErrorOnConsole)
    }

    function packagesHandler(data) {
      if(data && data.length!=0){
          let html=pacakgeGenerator.getHTMLforPackages(data)
          bindDOMEvents()
      }
    }

    function makeGETajax(u,q) {            
        let url=new URL(urls.endpoint+u)        
        if(q){
            Object.keys(q).map(function(key){              
                url.searchParams.append(key,q[key])
            })
        }        
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

    function logErrorOnConsole(err) {
        console.log(err)
    }
    function init() {
        DOMReference=CacheDOM()      
        getPackages()                  
    }

    return {
        init:init
    }

}())