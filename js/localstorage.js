// Guardar objetos en LocalStorage
function saveToLocalStorage (toberead, book) {
	const stringBook = JSON.stringify(book);
	console.log(stringBook);
	localStorage.setItem(toberead, stringBook);
}

// Recuperar todos los objetos guardados en el LocalStorage
function getFromLocalStorage (toberead) {
	const resultString = localStorage.getItem(toberead);
	const result = JSON.parse(resultString);
	console.log("Result from local: ", result);
	return result;
}

// Añadir libros al array guardado en LocalStorage
function addToLocalStorageArray (toberead, book) {
	const array = getFromLocalStorage(toberead) || [];
	const index = array.findIndex(element => element.id === book.id);
	if (index !== -1) {
		return;
	}
	array.push(book);
	saveToLocalStorage(toberead, array);
}

// Eliminar libros del array guardado en LocalStorage
function removeFromLocalStorageArray (toberead, book) {
	const array = getFromLocalStorage(toberead);
	if (!array) {
		return;
	}
	const index = array.findIndex(element => element.id === book.id);
	if (index === -1) {
		return;
	}
	array.splice(index, 1);
	saveToLocalStorage(toberead, array);
}

// Buscar libros en lo guardado TODO comprobar si usamos la función
function findInLocalStorageArray (toberead, book) {
	const array = getFromLocalStorage(toberead) || [];
	return array.find(element => element.id === book.id);
}

export {
	saveToLocalStorage,
	getFromLocalStorage,
	addToLocalStorageArray,
	removeFromLocalStorageArray,
	findInLocalStorageArray
}