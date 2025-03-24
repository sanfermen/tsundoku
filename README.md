# tsundoku

**Tsundoku** *(積ん読)* es un término japonés que se refiere al hábito de adquirir todo tipo de materiales de lectura, pero dejando que se amontonen en la vivienda sin leerlos.

Con el término como inspiración de esta aplicación, creamos **una app para almacenar los libros que queremos leer en el futuro, sin la pretensión de leerlos realmente**.


## miembros del grupo:
- [Anaís Cabado](https://github.com/AnaisCabado)
- [Asier González](https://github.com/AsGon1) 
- [Dalila Cabrera](https://github.com/crdalila)
- [Sandra Fernández](https://github.com/sanfermen)


## funcionalidad

En la página principal de la app tenemos un buscador por título de los libros sacados de la [API Google Books](https://developers.google.com/books?hl=es-419). Los resultados de esta búsqueda se mostrarán en la página *búsqueda avanzada*, donde aparecen distintos filtros que nos ayudarán a buscar las lecturas de forma más exhaustiva, por categorías como "autorx", "sinopsis", "editorial" o "géneros".
Cada libro tiene la opción de ponerlo en nuestra *WISHLIST*, que puede almacenar hasta 100 lecturas. Pulsando el mismo botón que hemos usado para añadirlo, podemos eliminarlo de nuestra wishlist.


### apiKey
Para poder acceder correctamente a la app, **necesitas una Api Key de Google Books**. Para ello, necesitas una cuenta de Google.
- Entra en la consola de APIs de Google
- Crea un proyecto en Google Cloud para asociar la API Key con el proyecto
- En el buscador del Google Cloud, busca la API de Google Books y dale a HABILITAR
- Copia el código que te da
- Introdúcela en el archivo apikey.js.example entre los ""
- Eliminar el .example del archivo para que tenga extensión .js
