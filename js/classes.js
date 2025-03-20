class Book {
    static id = 0;

    constructor(title, publisherDate, pageCount, language, categories, description, imageLinks, authors, infoLink) {
        this.id = ++Book.id;
        this.title = title;
        this.publisherDate = publisherDate;
        this.pageCount = pageCount;
        this.language = language; // TODO ??
        this.categories = categories;
        this.description = description;
        this.imageLinks = imageLinks;
        this.authors = authors;
        this.infoLink = infoLink;

        this.fav = false;
    }

    saveFav() {
        if(this.fav) {
            return;
        }
        this.fav = true;
    }

    removeFav() {
        this.fav = false;
    }
}

class Tsundoku {
    static wishListLimit = 100;
    static topListLimit = 10;
    static suggestionsLimit = 10;

    constructor() {
        this.bookStorage = [];
        this.wishList = [];
        this.topList = [];
        this.suggestions = [];

        this.wishListFlag = false;
        this.topListFlag = false;
        this.suggestionsFlag = false;
    }

    addToBookStorage(item) {
        this.bookStorage.push(item);
    }

    addToWishList(item) {
        if(!this.wishListFlag) {
            this.wishList.push(item);
        }
    }

    removeFromWishList(id) {
        const position = this.wishList.findIndex(item => item.id === id);

        if(position === -1) {
            throw new Error(`Favorito no encontrado.`);
        }

        this.wishList.splice(position, 1);
    }

    watchFavLimit() {
        if(this.wishList.length === wishListLimit) {
            this.wishListFlag = true;
        }
    }

    addToTopList(item) {
        if(!this.topListLimit) {
            this.topList.push(item);
        }
    }

    watchTopLimit() {
        if(this.topList.length === topListLimit) {
            this.topListFlag = true;
        }
    }

    addToSuggestionsList(item) {
        if(!this.suggestionsListLimit) {
            this.suggestionsList.push(item);
        }
    }

    watchSuggestionsLimit() {
        if(this.suggestionsList.length === suggestionsListLimit) {
            this.suggestionsListFlag = true;
        }
    }
}