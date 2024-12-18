const contenedorProductos = document.getElementById("contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const botonCarrito = document.querySelector(".boton-carrito");
const numeritoCarrito = document.getElementById("numerito");

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

actualizarNumeritoCarrito();

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos);
    })
    .catch(error => console.error("Error al cargar los productos:", error));

function mostrarProductos(listaProductos) {
    contenedorProductos.innerHTML = "";

    listaProductos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.appendChild(div);
    });

    const botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(event){
    const idProducto = event.target.getAttribute("data-id");
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);

    if(productoSeleccionado){
        const productoExistente = carrito.find(prod => prod.id === productoSeleccionado.id);
        
        if (productoExistente){
            productoExistente.cantidad += 1;
        } else {
            carrito.push({...productoSeleccionado, cantidad: 1})
        }
    }

    guardarCarrito();
    actualizarNumeritoCarrito();
}

function actualizarNumeritoCarrito(){
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    numeritoCarrito.textContent = totalProductos;
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (event) => {
        const categoriaId = event.currentTarget.id;

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        event.currentTarget.classList.add("active");

        if (categoriaId === "todos"){
            mostrarProductos(productos);
        } else {
            const productosFiltrados = productos.filter(producto => producto.categoria.id === categoriaId);
            mostrarProductos(productosFiltrados);
        }
    });
});

botonCarrito.addEventListener("click", () => {
    window.location.href = "carrito.html";
});

document.querySelectorAll(".logo").forEach(logo => {
    logo.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
    })
})


//Barra desplegable
const openMenuButton = document.getElementById("open-menu");
const closeMenuButton = document.getElementById("close-menu");
const aside = document.querySelector(".aside-visible");

openMenuButton.addEventListener("click", () =>{
    aside.classList.add("active");
});

closeMenuButton.addEventListener("click", () => {
    aside.classList.remove("active");
});