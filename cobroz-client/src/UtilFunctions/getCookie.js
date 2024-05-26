export function getCookieVal(cookieName){
    //list of all cookies 
    const cookies = document.cookie.split(";");

    for(var i=0; i<cookies.length ; i++){
        let cookie = cookies[i].trim(); //removing leading and trailing whitespace

        if(cookie.startsWith(cookieName + "=")){
            return cookie.substring(cookieName.length + 1);
        }
    }

    return null;
}

