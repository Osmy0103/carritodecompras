/** TU ALMACEN.COM - CARRITO DE COMPRAS **/
//¿Qué funcionalidad debe tener un carrito de compras?

//1) Mostrar productos en el HTML de forma dinámica. 
//2) Agregar productos en el carrito. 
//3) Evitar la carga de productos repetidos en el carrito. 
//4) Mostrar el carrito en el HTML de forma dinámica. 
//5) Eliminar productos del carrito. 
//6) Calcular el total de la compra. 
//7) Vaciar el carrito.  


/////////////////////////////////////////////

class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const arroz = new Producto(1, "Arroz", 100, "img/arroz.png");
const azucar = new Producto(2, "Azucar", 50, "img/azucar.png");
const fideos = new Producto(3, "Fideos", 80, "img/fideos.png");
const mermelada = new Producto(4, "Mermelada", 150, "img/mermelada.png");
const queso = new Producto(5, "Queso", 200, "img/queso.png");
const sal = new Producto(6, "Sal", 30, "img/sal.png");
const tomate = new Producto(7, "Tomate", 70, "img/tomate.png");
const yerba = new Producto(8, "Yerba", 120, "img/yerba.png");

//Creamos un array con todo nuestro catálogo de productos: 

const productos = [arroz, azucar, fideos, mermelada, queso, sal, tomate, yerba];

//Creamos el Array del Carrito de compras: 

let carrito = [];

//Mostramos los productos modificando el DOM: 

const contenedorProductos = document.getElementById("contenedorProductos");

//Creamos una función para mostrar los productos: 


const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                            <div class="card">
                                <img src=${producto.img} class="card-img-top imgProductos" >
                                <div class="card-body">
                                    <h5> ${producto.nombre} </h5>
                                    <p> ${producto.precio} </p>
                                    <button id="boton${producto.id}" class= "btn colorBoton"> Agregar al carrito </button>
                                </div>
                            </div>`
        contenedorProductos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

//Creamos la función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    //verificamos por consola: 
    console.log(carrito);
    calcularTotal();
}

//Mostrar el carrito de compras: 

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

//Ahora si creamos la función para mostrar el carrito

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                            <div class="card">
                                <img src=${producto.img} class="card-img-top imgProductos" >
                                <div class="card-body">
                                    <h5> ${producto.nombre} </h5>
                                    <p> ${producto.precio} </p>
                                    <button id="eliminar${producto.id}" class= "btn colorBoton"> Eliminar </button>
                                </div>
                            </div>`

        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

//Creamos la función que elimina productos del carrito: 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    //¿Que puedo invocar acá? 
    mostrarCarrito();
}

//Función que elimina todo el carrito: 
const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    console.log("funciona aca")
}

//Calculamos el total de la compra: 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad. 
    })
    total.innerHTML = `Total: $${totalCompra} `
}