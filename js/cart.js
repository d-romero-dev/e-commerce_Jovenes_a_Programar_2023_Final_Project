const APIcarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

function eliminarEnDesarrollo() {
    let alerta = document.getElementsByClassName(
        'alert alert-danger text-center'
    );
    alerta[0].remove();
}

function getCarritodeCompras() {
    return fetch(APIcarrito)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(carrito => {
            return carrito;
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
}

function showCarritodeCompras(carrito) {
    const carritoContainer = document.getElementById("carritoContainer");
    let htmlContentToAppend = `
        <div class="text-center p-4"> 
            <h1> Carrito de compras </h1>
        </div> 
        <h3> Articulos a comprar</h3>
       
        <table class="table">
            <tr>
                <th> Imagen</th>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
            <tr>
                <td>
                <img src="${carrito.articles[0].image}" width="100" alt= "Imagen del articulo">
                </td>
                <td>${carrito.articles[0].name}</td>
                <td>${carrito.articles[0].currency} ${carrito.articles[0].unitCost}</td>
                <td> <input type="number" id="cantidadInput" value="${carrito.articles[0].count}" /></td>
                <td>${carrito.articles[0].currency} <span id="subtotal">${carrito.articles[0].unitCost * carrito.articles[0].count}</span></td>
            
            </tr>
        </table>
    `;
    carritoContainer.innerHTML = htmlContentToAppend;

    // Obtén los elementos necesarios del DOM
    const cantidadInput = document.getElementById('cantidadInput');
    const subtotalElement = document.getElementById('subtotal');

    // Función para calcular y actualizar el subtotal
    function calcularSubtotal() {
        // Obtiene la cantidad del campo de entrada
        const cantidad = parseInt(cantidadInput.value);

        // Calcula el subtotal multiplicando el precio unitario por la cantidad
        const subtotal = carrito.articles[0].unitCost * cantidad;

        // Actualiza el contenido del elemento de subtotal en la página
        subtotalElement.textContent = `${carrito.articles[0].currency} ${subtotal}`;
    }

    // Agrega un evento de entrada al campo de cantidad para llamar a la función calcularSubtotal() cuando cambie el valor
    cantidadInput.addEventListener('input', calcularSubtotal);

    // Calcula el subtotal inicial al cargar la página
    calcularSubtotal();
}

document.addEventListener("DOMContentLoaded", function () {
    eliminarEnDesarrollo();
    getCarritodeCompras()
    .then (function (carrito){
        showCarritodeCompras(carrito);
    });
});