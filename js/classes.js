class Book {
    static id = 0;

    constructor(title, publisherDate, pageCount, language, categories, description, imageLinks, authors, infoLink) {
        this.id = ++Book.id;
        this.title = title || "Sin título";
        this.publisherDate = publisherDate || "Sin fecha de publicación";
        this.pageCount = pageCount || "Sin recuento de páginas";
        this.language = language || "Sin información de idiomas"; // TODO ??
        this.categories = categories || ["Sin géneros conocidos"];
        this.description = description || "Sin sinopsis";
        this.imageLinks = imageLinks || "Sin imagen de portada";
        this.authors = authors || ["Sin autorxs conocidxs"];
        this.infoLink = infoLink || "Sin enlace de información";

        this.fav = false;
    }

    // FUNCION GUARDAR FAVORITOS
    saveFav() {
        if(this.fav) {
            return;
        }
        this.fav = true;
    }

    // FUNCION BORRAR FAVORITOS
    removeFav() {
        if(!this.fav) {
            return;
        }
        this.fav = false;
    }
}

class Tsundoku {
    // LIMITES DE ELEMENTOS PARA GUARDAR EN CADA LISTA
    static wishListLimit = 100;
    static topListLimit = 10;
    static suggestionsLimit = 10;

    constructor() {
        this.bookStorage = [];
        this.wishList = [];
        this.topList = [];
        this.suggestions = [];

        // ESTADO INFORMATIVO DE SI SE HA ALCANZADO EL LIMITE
        this.wishListFlag = false;
        this.topListFlag = false;
        this.suggestionsFlag = false;
    }

    // AÑADIDO DE ELEMENTOS A LA BIBLIOTECA PRINCIPAL
    addToBookStorage(item) {
        this.bookStorage.push(item);
    }

    // AÑADIDO DE ELEMENTOS A WISHLIST
    addToWishList(item) {
        if(!this.wishListFlag) {
            this.wishList.push(item);
        }
    }

    // RETIRADA DE ELEMENTOS DE LA WISHLIST
    removeFromWishList(id) {
        const position = this.wishList.findIndex(item => item.id === id);

        if(position === -1) {
            throw new Error(`Favorito no encontrado.`);
        }

        this.wishList.splice(position, 1);
    }

    // COMPROBACION DE LIMITE EN WISHLIST
    watchWishLimit() {
        if(this.wishList.length === wishListLimit) {
            this.wishListFlag = true;
        }
    }

    // AÑADIDO DE ELEMENTOS A TOP DE LIBROS
    addToTopList(item) {
        if(!this.topListLimit) {
            this.topList.push(item);
        }
    }

    // COMPROBACION DE LIMITE EN TOP DE LIBROS
    watchTopLimit() {
        if(this.topList.length === topListLimit) {
            this.topListFlag = true;
        }
    }

    // AÑADIDO DE ELEMENTOS A SUGERENCIAS
    addToSuggestionsList(item) {
        if(!this.suggestionsListLimit) {
            this.suggestionsList.push(item);
        }
    }

    // COMPROBACION DE LIMITE EN SUGERENCIAS
    watchSuggestionsLimit() {
        if(this.suggestionsList.length === suggestionsListLimit) {
            this.suggestionsListFlag = true;
        }
    }
}


export {
    Tsundoku, 
    Book
};