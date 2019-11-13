
import { apiBaseUrl } from "../Constants/constants";

export async function get(route, callback) {
    const http = new XMLHttpRequest();
    const url = apiBaseUrl + route;
    http.open("GET", url)
    await http.send();
    http.onreadystatechange = _ => {
        if (http.readyState === 4)
            callback(JSON.parse(http.responseText));  
        
    }  
}

