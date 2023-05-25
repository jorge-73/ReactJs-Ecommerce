# Proyecto Final CoderHouse - Peralta Jorge

El proyecto simula un ecommerce de productos Tecnológicos

## Dependencias Utilizadas

```
"@fortawesome/fontawesome-svg-core": "^6.2.1"
 "@fortawesome/free-solid-svg-icons": "^6.2.1"
 "bootstrap": "^5.3.0-alpha1"
 "bootswatch": "^5.2.3"
 "firebase": "^9.17.1"
 "react-router-dom": "^6.8.0"
 "sweetalert2": "^11.7.1"
 "toastify-js": "^1.12.0"
```

## `Descripción del Proyecto`

### `ItemListConteiner`

El Proyecto comienza con el Componente ItemListConteiner que esta renderizando el componente ItemList y a su vez este renderiza a el componente Item.
Estos muestran en formato de Cards hecho con Bootstrap5 los 12 productos que vienen de la base de datos de Firebase/Firestore.

También se muestra un Navbar que a su vez esta renderizando el componente CartWidget también diseñado con Bootstrap5 junto con un Icono de presentación de la pagina y otro de un carrito de compras que tiene un icono de 
FontAwesome que simula un carrito de compras real.
Además tiene las categorías para filtrar y mostrar solamente los productos que se quiera ver. como Celulares, Smart Tv, Smart Watch, Minicomponentes y Auriculares.

### `ItemDetailConteiner`

Al hacer click en el botón de "detalles" de cualquiera de los productos te lleva al componente de ItemDetailConteiner que este esta renderizando a ItemDetail.
Aqui también tenemos en forma de card una vista mas detallada pero solamente del producto elegido. con su descripción, cantidad, etc..
Este esta renderizando el componente ItemCount que tiene las cantidades y un botón para agregar ese producto al carrito de compras con su cantidad seleccionada, 
y también te habilita un botón para ver los productos que se encuentran en ese momento en el carrito.

### `CartContainer`

Adentro del Navbar se encuentra el componente CartConteiner que a su ves esta renderizando a el componente Cart.
Este se encarga de de mostrar la información de los productos que se encuentrar agregados en el carrito de compras. Estos cada uno tienen un botón con un icono de FontAwesome de para eliminar ese producto del carrito.
También se muestra la suma total de todos los productos que se van agregando hasta el momento y unos botones de Continuar Compra y Vaciar Carrito que tiene un mensaje de advertencia hecho con "SweetAlert2" si desea seguir con el vaciado del carrito o no.

### `CheckOut`

Al hacer click en Continuar compra nos dirigimos a el Componente CheckOut. Este como en el carrito muestra una información detallada de los productos añdadidos junto con la suma de todos ellos. Pero agrega un formulario para ingresar los datos del usuario junto con una verificación de el Email escrito.

Al estar todos los datos correctos se guarda la información con el botón "Guardar" y este mostrara un mensaje hecho con "Toastify-js" si la información se guardo correctamente o hubo un error.

Al guardar se habilitara el botón de Finalizar Compra que al presionar muestra un mensaje hecho con "SweetAlert2". Asi se ocultara todo y se mostrara la orden final de la compra con los datos del usuario y el id de la compra traida de la base de datos de "fiestore". Y para terminar también se habilita un botón para regresar a la pantalla principal de la aplicación.

### `Información Extra`

Toda los datos de Firebase/Firestore se llama de ItemCollection.js. que a su ves es usado en un componente de Context llamado DataBaseProvider para qaue estos datos puedan usarse en toda la app.
También cree otro Context para definir todas las funciones que se realizaran en el carrito de compras y demás.
Y para terminar el NavBar utiliza para ir a las distintas categorías NavLink de react-router-dom.
