const carritoProductos = document.getElementById("carrito-productos");
const carritoVacio = document.getElementById("carrito-vacio");
const carritoAcciones = document.getElementById("carrito-acciones");
const carritoComprado = document.getElementById("carrito-comprado");
const totalElement = document.getElementById("Total");
const botonVaciarCarrito = document.querySelector(".carrito-acciones-vaciar");
const botonComprarAhora = document.querySelector(".carrito-acciones-comprar");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos(){
    if (carrito.length === 0){
        carritoVacio.style.display = "block";
        carritoProductos.style.display = "none";
        carritoAcciones.style.display = "none";
        carritoComprado.style.display = "none";
        return;
    }

    carritoVacio.style.display = "none";
    carritoProductos.style.display = "block";
    carritoAcciones.style.display = "flex";
    carritoComprado.style.display = "none";

    const productosExistentes = carritoProductos.querySelectorAll(".carrito-producto");
    productosExistentes.forEach(producto => producto.remove());

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}>
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.cantidad * producto.precio}</p>
            </div>
            <button class="carrito-producto-comprar" data-id="${producto.id}"><i class="bi bi-cart-fill"></i></button>
            <button class="carrito-producto-eliminar" data-id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
        `;
        carritoProductos.appendChild(div);
    });

    actualizarTotal();
    agregarEventosBotones();
}

function agregarEventosBotones(){
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    const botonesComprar = document.querySelectorAll(".carrito-producto-comprar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProducto);
    });

    botonesComprar.forEach(boton => {
        boton.addEventListener("click", comprarProducto);
    });
}

function eliminarProducto(event){
    const idProducto = event.currentTarget.dataset.id;
    carrito = carrito.filter(producto => producto.id !== idProducto);
    guardarCarrito();
    mostrarProductos();
    alert("¿Quieres eliminar el producto?");
}

function comprarProducto(event){
    const idProducto = event.currentTarget.dataset.id;
    const producto = carrito.find(producto => producto.id === idProducto);

    if (producto.cantidad > 1){
        producto.cantidad -= 1;
    } else {
        carrito = carrito.filter(prod => prod.id !== idProducto);
    }

    guardarCarrito();
    mostrarProductos();
    alert("Has comprado el producto.");
}

function vaciarCarrito(){
    const confirmacion = confirm("¿Estás seguro que quieres elimnar todos los producots del carrito?");
    if (confirmacion){
        carrito = [];
        guardarCarrito();
        mostrarProductos();
    }
}

function comprarTodo(){
    const total = calcularTotal();
    const confirmacion = confirm(`¿Estás seguro que quieres comprar todos los productos por un total de $${total}`);
    
    if (confirmacion){
        carrito = [];
        guardarCarrito();
        mostrarProductos();
    }
}

function actualizarTotal() {
    const total = calcularTotal();
    totalElement.textContent = `$${total}`;
}

function calcularTotal(){
    return carrito.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
}

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("numeritoCarrito", carrito.reduce((total, producto) => total + producto.cantidad, 0));
}

botonVaciarCarrito.addEventListener("click", vaciarCarrito);
botonComprarAhora.addEventListener("click", comprarTodo);

mostrarProductos();

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