import { apiKey } from "./apikey.js"; //para saber de qué archivo cogemos la api key
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q="; //la url básica de la api

//para el fetch con GET
console.log('hola');
async function fetchData(url, parameters={}) {
    try {
        const finalURL = new URL (BASE_URL + url); //para que cocatene la base url con el resto de url
        Object.keys(parameters).forEach(param => {
            finalURL.searchParams.append(param, parameters[param]);
        })
        finalURL.searchParams.append("key=", apiKey);
        console.log(finalURL);
        const response = await fetch(finalURL.toString());//fetch lo importante jeje
        console.log("Respuesta", response);
        const data = await response.json();
        console.log("Datos: ", data);
        return data;
    }
    catch(error) {
        console.error(error);
    }
}


async function getFantasyBooks() {
    const url = "subject:Medical";
    const result = await fetchData(url);
    console.log("REsultado", result);
    return result;
}

getFantasyBooks();