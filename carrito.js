// Diccionario con la información completa de los productos
const productos = {
    "p001": {
        nombre: "Camiseta fantastica",
        precio: 80000,
        imagen: "https://via.placeholder.com/100"
    },
    "p002": {
        nombre: "taza amor",
        precio: 30000,
        imagen: "https://via.placeholder.com/100"
    },
    "p003": {
        nombre: "Gorra Clásica",
        precio: 50000,
        imagen: "https://via.placeholder.com/100"
    }
};

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function contarProductos(carrito) {
    const contador = {};
    carrito.forEach(id => {
        contador[id] = (contador[id] || 0) + 1;
    });
    return contador;
}

function mostrarCarrito() {
    const tbody = document.querySelector('#tabla-carrito tbody');
    tbody.innerHTML = '';
    const carrito = obtenerCarrito();
    const contador = contarProductos(carrito);
    let totalFinal = 0;

    Object.keys(contador).forEach(id => {
        const cantidad = contador[id];
        const producto = productos[id];

        if (producto) {
            const total = producto.precio * cantidad;
            totalFinal += total;

            const fila = document.createElement('tr');
            fila.innerHTML = `
            
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>
            <button onclick="cambiarCantidad('${id}', -1)">–</button>
            ${cantidad}
            <button onclick="cambiarCantidad('${id}', 1)">+</button>
            </td>
            
            <td>$${total.toLocaleString()}</td>
            <td><button onclick="eliminarProducto('${id}')">Eliminar</button></td>
          `;
            tbody.appendChild(fila);
        }
    });

    document.getElementById('total-final').textContent = `Total a pagar: $${totalFinal.toLocaleString()}`;
}

function cambiarCantidad(id, delta) {
    let carrito = obtenerCarrito();
    if (delta > 0) {
        carrito.push(id);
    } else {
        const index = carrito.indexOf(id);
        if (index !== -1) {
            carrito.splice(index, 1);
        }
    }

    if (carrito.includes(id)) {
        guardarCarrito(carrito);
    } else {
        eliminarProducto(id); // si se quedó en cero, eliminar completamente
    }

    mostrarCarrito();
}

function eliminarProducto(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(pid => pid !== id);
    guardarCarrito(carrito);
    mostrarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

function comprar() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
}

// Inicializar
mostrarCarrito();