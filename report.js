function sortPages(pages){
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a,b)=>{
        aHits = a[1]
        bHits = b[1]
        return b[1]-a[1]
    })
    return pagesArr;
}


function printReport(pages){
    console.log("================================================================");
    console.log("REPORT");
    console.log("================================================================");
    const sortedPages = sortPages(pages);
    for(const sortPages of sortedPages){
        console.log(`${sortPages[0]} occurs ${sortPages[1]}`)
    }
}
module.exports = {
    sortPages,
    printReport
}