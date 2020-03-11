const packageGenerator=(
    function(){
        function PackageHtml(params) {
            return packageFormer()
        }

        function packageFormer(params) {
            let pkgid=create_UUID()
            let packageHTML="<fieldset id='"+pkgid+"'>"        
            packageHTML+="<table><tbody>"
            packageHTML+="<tr><td>Display Image : </td><td>"+getFileUploadControl(pkgid)+"</td></tr>"
            packageHTML+="<tr><td>Title : </td><td>"+getPackageTitleControls(pkgid)+"</td></tr>"
            packageHTML+="<tr><td>Price : </td><td>"+getPackagePriceControls(pkgid)+"</td></tr>"
            packageHTML+="<tr><td>Inclusions : </td><td><fieldset><div id='pkginclusion_"+pkgid+"'>"+getPackageInclusionControls()+"</div><button class='addinclusion'>+</button></fieldset></td></tr>"
            packageHTML+="<tr><td>Accomodations : </td><td><fieldset><div id='pkgaccomodations_"+pkgid+"'>"+getAccomodationControls()+"</div><button class='addaccomodation'>+</button></fieldset></td></tr>"
            packageHTML+="<tr><td>Daywise Description : </td><td><fieldset><div id='pkgdaywisedescription_"+pkgid+"'>"+getPackageDayWiseDescriptionControls()+"</div><button class='addday'>+</button></fieldset></td></tr>"
            packageHTML+="</tbody></table>"
            //packageHTML+="<button class='removePackage'>Remove</button>"
            packageHTML+="</fieldset>"
            return packageHTML
        }

        function getFileUploadControl(params) {
            return "<input type='file' id='pkgfileupload_"+params+"'/>"
        }

        function getPackageTitleControls(params) {
            return "<input type='text' data-package-title='packageTitle' id='pkgtitle_"+params+"'/>"
        }

        function getPackagePriceControls(params) {
            return "<input type='text' data-package-price='packagePrice' id='pkgprice_"+params+"'/>"
        }

        function getPackageInclusionControls(params) {
            return "<div><input type='text' data-package-inclusions='packageInclusions'/><button class='removeinc'>-</button><br></div>"
        }

        function getAccomodationControls(params) {
            return "<div><input type='text' data-package-accomodations='packageAccomodations'/><button class='removeinc'>-</button><br></div>"
        }

        function getPackageDayWiseDescriptionControls(params) {
            return "<div><textarea placeholder='Day Description'></textarea><button class='removeinc'>-</button></div>"            
        }

        return{
            getNewPackageHTML:PackageHtml,
            addinclusion: getPackageInclusionControls,
            addaccomodation:getAccomodationControls,
            addday:getPackageDayWiseDescriptionControls
        }
    }()
)