import { Tsundoku, Book } from "./classes.js";
import { getBookByTitle, getBookBySubject, getBookByAuthor} from "./api.js"

class BookHTML extends Book {
    constructor(title, publisherDate, pageCount, language, categories, description, imageLinks, authors, infoLink) {
        super(title, publisherDate, pageCount, language, categories, description, imageLinks, authors, infoLink);
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

    // VISUALIZACION DE ELEMENTOS
    render() {
        const isBookmark = findInLocalStorageArray("favorite", this);
        this.article.innerHTML = "";

        const image = document.createElement("img");
        const attributesTitle = document.createElement("h3");
        const attributeAuthors = document.createElement("h4");

        const attributeList = document.createElement("ul");
        const attributesPublisherDate = document.createElement("li");
        const attributesPageCount = document.createElement("li");
        const attributesLanguage = document.createElement("li"); // TODO ??
        const attributesDescription = document.createElement("li");

        const attributesCategories = document.createElement("ul");

        const attributesInfoLink = document.createElement("a");
        const wishButton = document.createElement("button");


        title.textContent = this.title;

        attributeList.classList.add("book__attributes");

        attributeAuthors.classList.add("attribute", "author");
        attributeAuthors.textContent = this.authorsNames(this.authors);

        attributesPublisherDate.classList.add("attribute", "date");
        attributesPublisherDate.textContent = this.publisherDate;

        attributesPageCount.classList.add("attribute", "pages");
        attributesPageCount.textContent = this.pageCount + " páginas";

        attributesLanguage.classList.add("attribute", "language");
        attributesLanguage.textContent = this.language;

        attributesDescription.classList.add("attribute", "description");
        attributesDescription.textContent = this.description;

        attributesCategories.classList.add("attribute", "categories");
        attributesCategories.textContent = this.categoriesString(this.categories);

        attributesInfoLink.classList.add("attribute", "info");
        attributesInfoLink.textContent = this.infoLink;

        if (isBookmark) {
            wishButton.textContent = "ELIMINAR"; // TODO INNERHTML
        } else {
            wishButton.textContent = "AÑADIR"; // TODO INNERHTML
        }

        wishButton.addEventListener("click", () => {
            if (isBookmark) {
                removeFromLocalStorageArray("favorite", this);
            } else {
                addToLocalStorageArray("favorite", this);
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
            const category = document.createElement("a");
            category.classList.add("attribute", "category");
            category.textContent = this.categories[i];

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
        this.initializeHome();
        this.initializeBrowser();
        this.initializeWishlist();
    }

    initializeIndex() {
        // creación del logo
        const index = document.getElementById("index"); //sección index página principal
        const logo = document.createElement('img'); //logo
        const presentation = document.createElement('p'); //texto de presentación

        // creación del BUSCADOR por título
        const browserDiv = document.createElement('div');
        const browserInput = document.createElement('input');
        const browserButton = document.createElement('button');

        browserInput.setAttribute("type", "text"); //añadir al input el type
        browserInput.setAttribute("placeholder", "Escribe el título de tu siguiente lectura"); //añadir al input el placeholder
        logo.setAttribute("src", "????"); //TODO poner la dirección del logo

        browserButton.textContent = "Buscar";//añadir el Buscar
        presentation.textContent = "Hola somos una prueba y este texto es la presentación"; //TODO Danel escribir texto de presentación

        browserDiv.setAttribute("id", "index__browser");

        browserDiv.append(browserInput, browserButton); //meter el input y botón en el div
        index.append(logo, presentation, browserDiv); //meter el div en la section browser

        //funcionalidad al boton buscar (por título)
        index.addEventListener("input", (e) => {
            console.log(e.target.value);
        });
        browserButton.addEventListener("click", (e) => {
            getBookByTitle(browserInput.value);
        });
    }

    initializeHome() {
        const home = document.getElementById("home");
        const sectionTheMost = document.createElement("section");
        const sectionSuggestions = document.createElement("section");
    
        sectionTheMost.setAttribute("id", "home__theMost");
        sectionSuggestions.setAttribute("id", "home__suggestions");

        home.append(sectionTheMost, sectionSuggestions);

        //TODO funcionalidad de the most y de suggestions
    }

    initializeBrowser(){
        const browser = document.getElementById('browser');
        //boton
        const browserDiv = document.createElement('div');
        const browserInput = document.createElement('input');
        const browserButton = document.createElement('button');
        //filters
        const sectionFilters = document.createElement('section');
        const checkboxAll = document.createElement('input');
        const textCheckboxAll = document.createElement('label');
        const checkboxTitle = document.createElement('input');
        const textCheckboxTitle = document.createElement('label');
        const checkboxAuthor = document.createElement('input');
        const textCheckboxAuthor = document.createElement('label');
        const checkboxISBN = document.createElement('input');
        const textCheckboxISBN = document.createElement('label');
        const checkboxPublisher = document.createElement('input');
        const textCheckboxPublisher = document.createElement('label');
        const checkboxRadioGenre = document.createElement('input');
        const textCheckboxGenre = document.createElement('label');
        const checkboxGenre = document.createElement('select');
        //select genre
        const genreHistorical = document.createElement('option');
        const genreFantasy = document.createElement('option');
        const genreScifi = document.createElement('option');
        const genreHorror = document.createElement('option');
        const genreThriller = document.createElement('option');
        const genreRomantic = document.createElement('option');
        const genreEssay = document.createElement('option');
        const genrePoetry = document.createElement('option');
        const genreMemories = document.createElement('option');
        const genreFiction = document.createElement('option');
        const genreNonFiction = document.createElement('option');
        

        //boton
        browserInput.setAttribute("type", "text"); //añadir al input el type
        browserInput.setAttribute("placeholder", "Encuentra tu siguiente lectura"); //añadir al input el placeholder
        browserButton.textContent = "Buscar";//añadir el Buscar
        browserDiv.setAttribute("id", "browser__advanceBrowser");
        //filters
        sectionFilters.setAttribute("id", "browser__filters");
        textCheckboxAll.textContent = "Todo";
        textCheckboxAll.setAttribute("for", "all");
        checkboxAll.setAttribute("type", "radio");
        checkboxAll.setAttribute("name", "filter"); //tenemos que poner el mismo name para que solo seleccione uno
        textCheckboxTitle.textContent = "Título";
        textCheckboxTitle.setAttribute("for", "title");
        checkboxTitle.setAttribute("type", "radio");
        checkboxTitle.setAttribute("name", "filter");
        textCheckboxAuthor.textContent = "Autor/Autora/Autore";
        textCheckboxAuthor.setAttribute("for", "author");
        checkboxAuthor.setAttribute("type", "radio");
        checkboxAuthor.setAttribute("name", "filter");
        textCheckboxISBN.textContent = "ISBN";
        textCheckboxISBN.setAttribute("for", "isbn");
        checkboxISBN.setAttribute("type", "radio");
        checkboxISBN.setAttribute("name", "filter");
        textCheckboxPublisher.textContent = "Editorial";
        textCheckboxPublisher.setAttribute("for", "publisher");
        checkboxPublisher.setAttribute("type", "radio");
        checkboxPublisher.setAttribute("name", "filter");
        checkboxRadioGenre.setAttribute("type", "radio");
        checkboxRadioGenre.setAttribute("name", "filter");
        textCheckboxGenre.textContent = "Género";
        textCheckboxGenre.setAttribute("for", "genre");
        //genres
        genreHistorical.setAttribute("value", "historical"); //TODO cambiarlo a inglés
        genreHistorical.textContent = "Histórica";
        genreFantasy.setAttribute("value", "fantasy");
        genreFantasy.textContent = "Fantasía";
        genreScifi.setAttribute("value", "scifi");
        genreScifi.textContent = "Ciencia Ficción";
        genreHorror.setAttribute("value", "horror");
        genreHorror.textContent = "Terror";
        genreThriller.setAttribute("value", "thriller");
        genreThriller.textContent = "Thriller";
        genreRomantic.setAttribute("value", "romantic");
        genreRomantic.textContent = "Romántica";
        genreEssay.setAttribute("value", "essay");
        genreEssay.textContent = "Ensayo";
        genrePoetry.setAttribute("value", "poetry");
        genrePoetry.textContent = "Poesía";
        genreMemories.setAttribute("value", "memories");
        genreMemories.textContent = "Memorias";
        genreFiction.setAttribute("value", "fiction");
        genreFiction.textContent = "Ficción";
        genreNonFiction.setAttribute("value", "nonfiction");
        genreNonFiction.textContent = "No ficción";

        browserDiv.append(browserInput, browserButton); //meter el input y botón en el div
        checkboxGenre.append(genreFiction, genreHistorical, genreFantasy, genreScifi, genreHorror, genreThriller, genreRomantic, genrePoetry, genreEssay, genreMemories, genreNonFiction);
        sectionFilters.append(checkboxAll, textCheckboxAll, checkboxTitle, textCheckboxTitle, checkboxAuthor, textCheckboxAuthor, checkboxRadioGenre, textCheckboxGenre, checkboxGenre, checkboxPublisher, textCheckboxPublisher, checkboxISBN, textCheckboxISBN);
        browser.append(browserDiv, sectionFilters); //meter el div en la section browser

        // TODO añadir funcionalidad a los checkbox
        browser.addEventListener("input", (e) => {
            console.log(e.target.value);
        });
        browserButton.addEventListener("click", (e) => {
            getBookByTitle(browserInput.value); 
        });
    }

    initializeWishlist(){
        //TODO buscador favoritos
        const wishlist = document.getElementById("wishlist");
        BookHTML.render();
    }
}


export { 
    TsundokuHTML,
    BookHTML
}


