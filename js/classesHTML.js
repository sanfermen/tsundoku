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
        super(); //TODO ????
        this.initialize();        
    }
    initialize() {
        // creación de elementos html
        const browser = document.getElementById("browser");
        const browserDiv = document.createElement('div');
        const browserInput = document.createElement('input');
        const browserButton = document.createElement('button');

        browserInput.setAttribute("type", "text"); //añadir al input el type
        browserInput.setAttribute("placeholder", "Escribe el título de tu siguiente lectura"); //añadir al input el placeholder

        browserButton.textContent = "Buscar";//añadir el Buscar

        browserDiv.setAttribute("id", "browser__searcher");

        browserDiv.append(browserInput, browserButton); //meter el input y botón en el div
        browser.appendChild(browserDiv); //meter el div en la section browser
        

        //funcionalidad al boton
        browser.addEventListener("input", (e) => {
            console.log(e.target.value);
        });
        browserButton.addEventListener("click", (e) => {
            getBookByTitle(browserInput.value);
        });


    }


}

export { 
    TsundokuHTML,
    BookHTML
}


