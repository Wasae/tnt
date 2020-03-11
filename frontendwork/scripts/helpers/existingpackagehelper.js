let existingPackageHelper=(function() {
    let tabletagsHelper={
        openingTD:"<td>",
        closingTD:"</td>",
        openingTR:"<tr>",
        closingTR:"</tr>",
        openingTH:"<th>",
        closingTH:"</th>",
        openingTable:"<table>",
        closingTable:"</table>",
        openingTableHeader:"<thead>",
        closingTableHeader:"</thead>",
        openingTableBody:"<thead>",
        closingTableBody:"</thead>",
    }

    function init(data,columns,dataprops) {
        try {
            if (columns && columns.length!=0 && dataprops && dataprops.length!=0) {
                return TableGenerator(data,columns,dataprops)    
            }
            else{
                console.log("Headers or Data Property is missing")
            }            
        } catch (error) {
            console.log(error)
        }        
        return
    }

    function FormTablHeader(ths) {
        let trth=""
        if (ths && ths.length!=0) {
            trth+=ths.map(function(d){
                return tabletagsHelper.openingTH+d+tabletagsHelper.closingTH
            }).join('')
        } 
        return trth
    }

    function FormTableRow(trs,dataprops) {
        let trtd=""
        if (trs && trs.length!=0) {
            trtd+=trs.map(function(d){
                let rowhtml=tabletagsHelper.openingTR
                rowhtml+=dataprops.map(function(a){
                            return tabletagsHelper.openingTD+d[a]+tabletagsHelper.closingTD
                         }).join('')   
                rowhtml+=tabletagsHelper.openingTD+"<button class='tbleditbtn'>Edit</button>"+tabletagsHelper.closingTD
                rowhtml+=tabletagsHelper.openingTD+"<button class='tbldeletebtn'>Delete</button>"+tabletagsHelper.closingTD
                return rowhtml+=tabletagsHelper.closingTR
            }).join('')
        }
        return trtd
    }

    function TableGenerator(params,columns,dataprops) {
        let tableHTML=""
        tableHTML+=tabletagsHelper.openingTable        
        tableHTML+=tabletagsHelper.openingTableHeader
        tableHTML+=tabletagsHelper.openingTR        
        tableHTML+=FormTablHeader(columns)
        tableHTML+=tabletagsHelper.closingTR
        tableHTML+=tabletagsHelper.closingTableHeader
        tableHTML+=tabletagsHelper.openingTableBody
        tableHTML+=FormTableRow(params,dataprops)
        tableHTML+=tabletagsHelper.closingTableBody
        tableHTML+=tabletagsHelper.closingTable
        return tableHTML
    }
    
    return {
        init:init
    } 
}())
