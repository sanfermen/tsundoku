import { Tsundoku, Book } from "./classes.js";
import { getBookByTitle, getBookBySubject, getBookByAuthor, getBookByPublisher } from "./api.js"
import { addToLocalStorageArray, getFromLocalStorage, removeFromLocalStorageArray, findInLocalStorageArray } from "./localstorage.js";
import { displayBook, displayFavoriteBooks } from "./functions.js";


class BookHTML extends Book {
    constructor(id, title, publisherDate, pageCount, language, categories, description, imageLinks, authors, infoLink) {
        super(id, title, publisherDate, pageCount, language, categories, description, imageLinks, authors, infoLink);
        this.article = null;
    }

    // CREACION DE ARTICLES QUE REPRESENTA A CADA TARJETA DE LIBRO
    createHTML(fatherElement) {
        this.article = document.createElement("article");
        this.article.classList.add("book", "card");

        fatherElement.appendChild(this.article);
    }

    // INICIALIZA CADA ELEMENTO PARA SU VISUALIZACION
    initialize(fatherElement) {
        this.createHTML(fatherElement);
        this.render();
    }

    // FUNCION GUARDAR FAVORITOS
    saveFav() {
        super.saveFav();
        this.article.classList.add("bookmark");
    }

    // FUNCION BORRAR FAVORITOS
    removeFav() {
        super.removeFav();
        this.article.classList.remove("bookmark");
    }

    // VISUALIZACION DE ELEMENTOS. Tarjetas de libros
    render() {
        const isBookmark = findInLocalStorageArray("favorites", this);
        this.article.innerHTML = "";

        const image = document.createElement("img");
        const attributesTitle = document.createElement("h3");
        const attributeAuthors = document.createElement("h4");

        const attributeList = document.createElement("ul");
        const attributesPublisherDate = document.createElement("li");
        const attributesPageCount = document.createElement("li");
        const attributesLanguage = document.createElement("li");
        const attributesDescription = document.createElement("li");

        const attributesCategories = document.createElement("ul");
        attributesCategories.style.display = "none";

        const attributesInfoLink = document.createElement("a");
        const wishButton = document.createElement("button");

        image.setAttribute("src", this.imageLinks.smallThumbnail);
        attributesTitle.textContent = this.title;

        attributeList.classList.add("book__attributes");

        attributeAuthors.classList.add("attribute", "author");
        attributeAuthors.textContent = "Autorx: " + this.authorsNames(this.authors);

        attributesPublisherDate.classList.add("attribute", "date");
        attributesPublisherDate.textContent = "Fecha de publicación: " + this.publisherDate;

        attributesPageCount.classList.add("attribute", "pages");
        attributesPageCount.textContent = "Páginas: " + this.pageCount;

        attributesLanguage.classList.add("attribute", "language");
        attributesLanguage.textContent = "Idioma: " + this.language;

        attributesDescription.classList.add("attribute", "description");
        attributesDescription.textContent = "Sinopsis: " + this.description;

        attributesCategories.classList.add("attribute", "categories");
        attributesCategories.textContent = this.createCategories(attributesCategories);

        attributesInfoLink.classList.add("attribute", "info");
        attributesInfoLink.textContent = "Más info";
        attributesInfoLink.setAttribute("href", this.infoLink);
        attributesInfoLink.setAttribute("target", "_blank");

        if (isBookmark) {
            wishButton.textContent = "ELIMINAR"; // TODO INNERHTML icono
        } else {
            wishButton.textContent = "AÑADIR"; // TODO INNERHTML icono
        }

        wishButton.addEventListener("click", () => {
            if (isBookmark) {
                this.removeFav();
                removeFromLocalStorageArray("favorites", this);
            } else {
                this.saveFav();
                console.log(this);
                addToLocalStorageArray("favorites", this);
            }
            this.render();
        })

        attributeList.append(attributesPublisherDate, attributesPageCount, attributesLanguage, attributesDescription);

        this.article.appendChild(image);
        this.article.appendChild(attributesTitle);
        this.article.appendChild(attributeAuthors);
        this.article.appendChild(attributeList);

        // CREACION DE LISTA DE CATEGORIAS
        if (attributesCategories.length === 1) { // SI SOLO HAY UNA CATEGORIA SE CREA UN ELEMENTO "A"
            const category = document.createElement("a");
        } else {
            this.createCategories(attributesCategories);
        }
        this.article.appendChild(attributesCategories);

        this.article.appendChild(wishButton);
        
        this.article.appendChild(attributesInfoLink);
    }

    // AÑADIDO DE NOMBRES DE AUTORES A UN MISMO STRING
    authorsNames(array) {
        let authorsNamesString = "";

        if (array.length === 1) {
            return array[0];
        }

        for (let i = 0; i < array.length; i++) {
            authorsNamesString += array[i] + (i === array.length - 1) ? "" : ", ";
        }

        return authorsNamesString;
    }

    // AÑADIDO DE TODAS LAS CATEGORIAS A LA LISTA EN FUNCION DE LA CANTIDAD
    createCategories(attributesCategories) {
        for (let i = 0; i < this.categories.length; i++) {
            const category = document.createElement("li");
            category.classList.add("attribute", "category");
            if (i === 0) {
                category.textContent = "Géneros: " + this.categories[i];
            } else {
            category.textContent += this.categories[i];
            }
            attributesCategories.append(category);
        }
    }
}

class TsundokuHTML extends Tsundoku {
    constructor() {
        super();
        this.initialize();
    }
    initialize() { //lo que se ve, sin ningún cambio
        this.initializeIndex();
        this.initializeBrowser();
        this.initializeWishlist();
    }

    initializeIndex() {
        // creación del logo
        const index = document.getElementById("index"); //sección index página principal
        const logo = document.createElement('img'); //logo
        const presentation = document.getElementById("index__presentation"); //texto de presentación

        // creación del BUSCADOR
        const browserDiv = document.createElement('div');
        const browserInput = document.createElement('input');
        const browserButton = document.createElement('button');

        browserInput.setAttribute("type", "text"); //añadir al input el type
        browserInput.setAttribute("placeholder", "Escribe el título de tu siguiente lectura"); //añadir al input el placeholder
        logo.setAttribute("src", "????"); //TODO poner la dirección del logo

        browserButton.textContent = "Buscar";//añadir el Buscar

        browserDiv.setAttribute("id", "index__browser");
        browserDiv.append(browserInput, browserButton); //meter el input y botón en el div
        index.append(logo, presentation, browserDiv); //meter el div en la section browser

        browserButton.addEventListener("click", async (e) => {
            await getBookByTitle(browserInput.value);
        });
    }


    initializeBrowser(){
        const browser = document.getElementById('browser');
        const tituloBrowser = document.createElement('h1');
        //boton
        const browserDivInput = document.createElement('div');
        const browserInput = document.createElement('input');
        const browserDivButton = document.createElement('div');
        const browserButton = document.createElement('button');
        //filters
        const sectionFilters = document.createElement('section');
        const checkboxTitle = document.createElement('input');
        const textCheckboxTitle = document.createElement('label');
        const checkboxAuthor = document.createElement('input');
        const textCheckboxAuthor = document.createElement('label');
        const checkboxPublisher = document.createElement('input');
        const textCheckboxPublisher = document.createElement('label');
        const checkboxRadioGenre = document.createElement('input');
        const textCheckboxGenre = document.createElement('label');
        //disclaimer
        const disclaimer = document.createElement('p');
        //section resultados
        const resultSection = document.createElement('section');
        
        //ATRIBUTOS
        tituloBrowser.textContent = "Búsqueda avanzada";
        //boton
        browserInput.setAttribute("type", "text"); //añadir al input el type
        browserInput.setAttribute("placeholder", "Encuentra tu siguiente lectura"); //añadir al input el placeholder
        browserButton.textContent = "Buscar";//añadir el Buscar
        browserDivInput.setAttribute("id", "browser__advanceBrowser-input");
        browserDivButton.setAttribute("id", "browser__advanceBrowser-button")
        //filters
        sectionFilters.setAttribute("id", "browser__filters");
        textCheckboxTitle.textContent = "Título";
        textCheckboxTitle.setAttribute("for", "title");
        checkboxTitle.setAttribute("type", "radio");
        checkboxTitle.setAttribute("name", "filter");
        checkboxTitle.setAttribute("value", "title");
        checkboxTitle.setAttribute("checked", ""); //para que aparezca marcado por defecto
        textCheckboxAuthor.textContent = "Autorx";
        textCheckboxAuthor.setAttribute("for", "author");
        checkboxAuthor.setAttribute("type", "radio");
        checkboxAuthor.setAttribute("name", "filter");
        checkboxAuthor.setAttribute("value", "author");
        textCheckboxPublisher.textContent = "Editorial";
        textCheckboxPublisher.setAttribute("for", "publisher");
        checkboxPublisher.setAttribute("type", "radio");
        checkboxPublisher.setAttribute("name", "filter");
        checkboxPublisher.setAttribute("value", "publisher");
        textCheckboxGenre.textContent = "Género literario*";
        textCheckboxGenre.setAttribute("for", "genre");
        checkboxRadioGenre.setAttribute("type", "radio");
        checkboxRadioGenre.setAttribute("name", "filter");
        checkboxRadioGenre.setAttribute("value", "genre");
        //disclaimer
        disclaimer.setAttribute("id", "browser__disclaimer");
        disclaimer.textContent = "*Para buscar por género literario, por favor introdúcelo sin tildes"
        //section results
        resultSection.setAttribute("id", "browser__results");

        //APPEND
        browserDivInput.appendChild(browserInput); //meter el input en el div
        browserDivButton.appendChild(browserButton); //meter el botón en el div
        sectionFilters.append(checkboxTitle, textCheckboxTitle, checkboxAuthor, textCheckboxAuthor, checkboxRadioGenre, textCheckboxGenre, checkboxPublisher, textCheckboxPublisher);
        browser.append(tituloBrowser, browserDivInput, sectionFilters, disclaimer, browserDivButton, resultSection); //meter el div en la section browser

        //BOTONES CHECKBOX FUNCIONAL

        browserButton.addEventListener("click", function () {
            const selectedOption = document.querySelector('input[name="filter"]:checked').value;
            if (selectedOption === "title") {
                getBookByTitle(browserInput.value);
            } else if (selectedOption === "publisher") {
                getBookByPublisher(browserInput.value);
            } else if (selectedOption === "author") {
                getBookByAuthor(browserInput.value);
            } else if (selectedOption === "genre") {
                getBookBySubject(browserInput.value);
            }
        }) 
    }

    initializeWishlist(){
        const wishlistSection = document.getElementById("wishlist");
        const tituloWishlist = document.createElement('h1');
        tituloWishlist.textContent = "Wishlist";
        wishlistSection.innerHTML = "";
        const wishlistLocalStorage = getFromLocalStorage("favorites") || []; //si hay wishlist la carga, si no, array vacío
        const wishlistLocalStorageDiv = document.createElement("div");
        wishlistLocalStorageDiv.setAttribute("id", "wishlist__books");
        wishlistSection.append(tituloWishlist, wishlistLocalStorageDiv);
        displayFavoriteBooks(wishlistLocalStorage);
        
    }
}


export { 
    TsundokuHTML,
    BookHTML
}


