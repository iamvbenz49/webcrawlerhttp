const {JSDOM} = require("jsdom");

async function crawlPage(baseURL,currentURL,pages){
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);
    
    if(pages[normalizedURL]>0){
        pages[normalizedURL]++;
        return pages;
    }
    pages[normalizedURL] = 1;
    console.log(`actively crawling :${currentURL}`);
    let htmlBody = "";
    try{
        const resp = await fetch(currentURL);

        if(resp.status>399){
            console.log(`error in fetch status code :${resp.status}`);
            return pages;
        }

        const contentType = resp.headers.get("content-type");
        if(!contentType.includes("text/html")){
            console.log(`Invalid content type ${contentType}, on page:${currentURL}`);
            return pages;
        }
        htmlBody = await resp.text();
        
    }catch(err){
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
    }
    const nextURLs = getURLsFromHTML(htmlBody,baseURL);

    for(const nextURL of nextURLs){
        pages = await crawlPage(baseURL,nextURL,pages);
    }
    return pages;
}

function getURLsFromHTML(htmlBody,baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1)==='/'){
            //relative
            urls.push(`${baseURL}${linkElement.href}`)
        }else{
            urls.push(linkElement.href);
        }
    }
    return urls;
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1)=="/"){
        return hostPath.slice(0,-1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}