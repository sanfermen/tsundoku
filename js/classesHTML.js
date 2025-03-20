import { Tsundoku, Book } from "./classes";

class BookHTML extends Book {
    constructor(title, publisherDate, pageCount, language, categories, description, imageLinks, authors, infoLink) {
        super(title, publisherDate, pageCount, language, categories, description, imageLinks, authors, infoLink);
        this.article = null;
    }

    createHTML(fatherElement) {
        this.article = document.createElement("article");
        this.article.classList.add("book", "card");

        fatherElement.appendChild(this.article);
    }

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
    }

    authorsNames(array) {
        let authorsNamesString = "";

        if(array.length === 1) {
            return array[0];
        }
        
        for(let i = 0; i < array.length; i++) {
            authorsNamesString += array[i] + (i === array.length - 1) ? "" : ", ";
        }

        return authorsNamesString;
    }

    categoriesString(array) {
        let categoriesString = "";

        if(array.length === 1) {
            return array[0];
        }
        
        for(let i = 0; i < array.length; i++) {
            categoriesString += array[i] + (i === array.length - 1) ? "" : ", ";
        }

        return categoriesString;
    }
}

class TsundokuHTML extends Tsundoku {
    constructor()
}

