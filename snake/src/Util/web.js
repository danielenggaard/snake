
import { apiBaseUrl } from "../Constants/constants";

export async function get(route, callback) {
    const http = new XMLHttpRequest();
    const url = apiBaseUrl + route;
    http.open("GET", url)
    await http.send();
    const fun = http.onreadystatechange = _ => callback(http.response);
    
    return fun();
}

