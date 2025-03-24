import { BookHTML } from "./classesHTML.js";

// Guardar objetos en LocalStorage
function saveToLocalStorage (toberead, book) {
	const stringBook = JSON.stringify(book);
	console.log("hola");
	localStorage.setItem(toberead, stringBook);
}

// Recuperar todos los objetos guardados en el LocalStorage
function getFromLocalStorage (toberead) {
	const resultString = localStorage.getItem(toberead);
	const resultJSON = JSON.parse(resultString);
	const result = [];
	if(resultJSON !== null) {
		resultJSON.forEach(book => { //crear un array de libros con el formato bookhtml
			const bookCard = new BookHTML (
				book.id,
				book.title,
				book.publishedDate,
				book.pageCount,
				book.language,
				book.categories,
				book.description,
				book.imageLinks,
				book.authors,
				book.infoLink
			)
			result.push(bookCard);
		});	
	}
	
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

// Función para guardar el formulario en local storage
function formToLocalStorage () {
	const formulario = document.getElementById("contact__form");
	formulario.addEventListener("submit", (e) => {
		e.preventDefault();
	});
	// Obtener los valores del formulario
    let nombre = document.getElementById("name").value;
    let email = document.getElementById("email").value;

	 // Crear un objeto con los datos
	 let datos = {
        nombre: nombre,
        email: email
    };

	// Guardar en localStorage (convertimos el objeto a string JSON)
    localStorage.setItem("formularioDatos", JSON.stringify(datos));

    alert("Datos guardados en localStorage.");
}


export {
	saveToLocalStorage,
	getFromLocalStorage,
	addToLocalStorageArray,
	removeFromLocalStorageArray,
	findInLocalStorageArray,
	formToLocalStorage
}