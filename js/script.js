/* DECLARACIONES */

let productosSeleccionados = JSON.parse(localStorage.getItem("productoSeleccinados")) || [];
const catalogoProductos=[
	{
		codigo: "1123101",
		nombre:"Martillo 8Oz",
		precio:15,
		img:"./img/Martillo.jpeg"
	},
	{
		codigo: "1123102",
		nombre:"Huincha 3m x 13mm",
		precio:14,
		img:"./img/Huincha.jpeg"
	},
	{
		codigo: "1123103",
		nombre:"Guantes Multiflex",
		precio:6,
		img:"./img/Guantes.jpeg"
	},
	{
		codigo: "1123104",
		nombre:"Casco Económico",
		precio:7,
		img:"./img/Casco.jpeg"
	},
	{
		codigo: "1123105",
		nombre:"Alicate Universal",
		precio:13,
		img:"./img/Alicate.jpeg"
	},
	{
		codigo: "1123106",
		nombre:"Set Destornilladores",
		precio:11,
		img:"./img/Destornilladores.jpeg"
	},
	{
		codigo: "1123107",
		nombre:"Taladro Percutor",
		precio:190,
		img:"./img/Taladro.jpeg"
	},
	{
		codigo: "1123108",
		nombre:"Amoladora angular",
		precio:222,
		img:"./img/Amoladora.jpeg"
	},
	{
		codigo: "1123109",
		nombre:"Disco para Madera",
		precio:23,
		img:"./img/Disco.jpeg"
	},
]
const botonCarrito = document.querySelector('#btnCarrito');
const contenedorCarrito = document.querySelector('#carrito');
const item = document.querySelector('.item');
const catalogo = document.querySelector('#catalogo');
const cantidadProductosAComprar = document.querySelector('#cantidad-productos-a-comprar');
const carritoVacio = document.querySelector('#carrito-vacio');
const totalCompra = document.querySelector('#total-compra');
const totalPagar = document.querySelector('#pagar');
botonCarrito.addEventListener('click', () => {contenedorCarrito.classList.toggle('ocultar-carrito');});

/* FUNCIONES */

const mostrarCatalogo=(parametro_productos)=>{
	catalogo.innerHTML="";
	parametro_productos.forEach((producto)=>{
		let div_producto = document.createElement("div");
		div_producto.classList.add("producto");
		div_producto.innerHTML=`
			<figure>
				<img src="${producto.img}" alt="producto">
			</figure>
			<div class="datos">
				<p class="codigo">${producto.codigo}</p>
				<h2 class="nombre">${producto.nombre}</h2>
				<p class="precio">$ ${producto.precio}</p>
				<button class="btn-agregar">Agregar al Carro</button>
			</div>`;
		catalogo.append(div_producto);
	})
}
const actualizarCarrito = () => {
	if (productosSeleccionados.length) {
		item.classList.remove('ocultar');
		totalCompra.classList.remove('ocultar');
		carritoVacio.classList.add('ocultar');
	} else {
		item.classList.add('ocultar');
		totalCompra.classList.add('ocultar');
		carritoVacio.classList.remove('ocultar');
	}

	item.innerHTML = '';
	let total = 0;
	let totalProductos = 0;

	productosSeleccionados.forEach(producto => {
		const contenedorProducto = document.createElement('div');
		contenedorProducto.classList.add('item-producto');

		contenedorProducto.innerHTML = `
            <div class="datos">
                <span class="cantidad">${producto.cantidad}</span>
				<p class="codigo">${producto.codigo}</p>
                <p class="nombre">${producto.nombre}</p>
                <span class="precio">${producto.precio}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="btn-eliminar"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		item.append(contenedorProducto);

		total = total + parseFloat(producto.cantidad * producto.precio.slice(1));
		totalProductos = totalProductos + producto.cantidad;
	});
	localStorage.setItem("productoSeleccinados", JSON.stringify(productosSeleccionados));
	totalPagar.innerText = `$ ${total}`;
	cantidadProductosAComprar.innerText = totalProductos;
};

/* EVENTOS */

catalogo.addEventListener('click', e => {
	if (e.target.classList.contains('btn-agregar')) {
		const producto = e.target.parentElement;

		const datosProductoSeleccionado = {
			codigo: producto.querySelector('.codigo').textContent,
			nombre: producto.querySelector('.nombre').textContent,
			precio: producto.querySelector('.precio').textContent,
			cantidad: 1,
		};

		const productoEncontrado = productosSeleccionados.some(
			producto => producto.codigo === datosProductoSeleccionado.codigo
		);

		if (productoEncontrado) {
			const productos = productosSeleccionados.map(producto => {
				if (producto.codigo === datosProductoSeleccionado.codigo) {
					producto.cantidad++;
					return producto;
				} else {
					return producto;
				}
			});
			productosSeleccionados = [...productos];
		} else {
			productosSeleccionados = [...productosSeleccionados, datosProductoSeleccionado];
		}

		actualizarCarrito();
	}
});

item.addEventListener('click', e => {
	if (e.target.classList.contains('btn-eliminar')) {
		let producto = e.target.parentElement;
		let codigo = producto.querySelector('.codigo').textContent;
		const posicionItem = productosSeleccionados.findIndex(itemProducto=>itemProducto.codigo===codigo);
		productosSeleccionados.splice(posicionItem,1);
		actualizarCarrito();
	}
});

/* INICIO */

mostrarCatalogo(catalogoProductos);
actualizarCarrito();
