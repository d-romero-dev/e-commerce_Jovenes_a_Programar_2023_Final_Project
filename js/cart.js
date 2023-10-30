let cart = JSON.parse(localStorage.getItem('cart'));
let standar = document.getElementById("tipoEnvio3");
let express = document.getElementById("tipoEnvio2");
let premium = document.getElementById("tipoEnvio1");

const htmlSubtotal = document.getElementById("subtotalFinal");
let envioTotal = document.getElementById("envioTotal");

const costosCart = {
  articulos: {},
  subtotal: {
    htmlElement: document.getElementById("subtotalFinal"),
    costo: 0,
  },
  envio: {
    htmlElement: document.getElementById("envioTotal"),
    costo: 0,
  },
  total: {
    htmlElement: document.getElementById("total"),
    costo: 0,
  },
}

function eliminarEnDesarrollo() {
  let alerta = document.getElementsByClassName(
    'alert alert-danger text-center'
  );
  alerta[0].remove();
}

// Función para calcular y actualizar el subtotal
function calcularSubtotal(evento, subtotalElement, unitCost) {
  // Obtiene la cantidad del campo de entrada
  const cantidad = parseInt(evento.target.value);

  // Calcula el subtotal multiplicando el precio unitario por la cantidad
  const subtotal = unitCost * cantidad;

  // Actualiza el contenido del elemento de subtotal en la página
  subtotalElement.textContent = `${subtotal}`;
  return subtotal;
}

// Calcula el subtotal inicial al cargar la página
// calcularSubtotal();

// Recibe un objeto producto y lo procesa, retorna un DOM de una fila con la información del producto
function crearElementoFilaProducto(article) {
  const fila = document.createElement('tr');
  fila.id = `filaProducto__${article.id}`;
  fila.innerHTML = `
        <td>
        <img src="${article.image}" width="100" alt= "Imagen del articulo">
        </td>
        <td>${article.name}</td>
        <td>${article.currency} ${article.unitCost}</td>
        <td> <input type="number" id="cantidadInput__${article.id}" value="${article.count}" /></td>
        <td>${article.currency} <span id="subtotal__${article.id}">${article.unitCost * article.count}</span></td>
        <td><button class="btn-danger" onclick="eliminarProducto(${article.id})">Eliminar</button></td>`;
  
  // Obtener elemento subtotal desde el elemento fila
  const subtotalElement = fila.querySelector(`#subtotal__${article.id}`);

  // Agrega un evento de entrada al campo de cantidad para llamar a la función calcularSubtotal() cuando cambie el valor
  fila
    .querySelector(`#cantidadInput__${article.id}`)
    .addEventListener('input', (evento) => {
      const articuloSubtotal = calcularSubtotal(evento, subtotalElement, article.unitCost);
      costosCart.articulos[article.id] = {subtotal: articuloSubtotal};
    }
    );
  return fila;
}

function showCarritodeCompras(carrito) {
  const carritoContainer = document.getElementById('carritoContainer');
  let htmlContentToAppend = `
        <div class="text-center p-4"> 
            <h1> Carrito de compras </h1>
        </div> 
        <h3> Articulos a comprar</h3>
       
        <table id="contenidoDelCarrito" class="table">
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
        </table>
    `;
  carritoContainer.innerHTML = htmlContentToAppend;

  // Obtén los elementos necesarios del DOM
  const tablaDeContenidoCarrito = document.getElementById(
    'contenidoDelCarrito'
  );

  carrito.articles.forEach((article) => {
    tablaDeContenidoCarrito.append(crearElementoFilaProducto(article));
  });

  tablaDeContenidoCarrito.addEventListener('input', () =>{
    sumSubtotal()
  })
}


document.addEventListener('DOMContentLoaded', function () {
  eliminarEnDesarrollo();
  const cart = JSON.parse(localStorage.getItem('cart'));
  showCarritodeCompras(cart);
  // Obtener elemento del DOM
  const tablaDeContenidoCarrito = document.getElementById('contenidoDelCarrito');
  // Agregar un evento de entrada para guardar los cambios en el carrito
  cart.articles.forEach((product) => {
    const cantidadInput = document.getElementById(`cantidadInput__${product.id}`);
    cantidadInput.addEventListener('input', (evento) => {
      const cantidad = parseInt(evento.target.value);
      if (!isNaN(cantidad) && cantidad >= 0) {
        // Actualizar la cantidad en el carrito
        product.count = cantidad;
        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Recalcular el subtotal
        const subtotalElement = document.getElementById(`subtotal__${product.id}`);
        subtotalElement.textContent = `${product.unitCost * cantidad}`;
      }
    });
  });
  sumSubtotal();
});



// Función para calcular el subtotal
function calcArticles(amount, costArticle){
  const subtotalArticulo = amount * costArticle;
  return subtotalArticulo;
  };


// Función para calcular el subtotal del cart sumando todos los subtotales de los articulos
function sumSubtotal(){
cart = JSON.parse(localStorage.getItem('cart'));
// reseteo el subtotal del cart
costosCart.subtotal.costo = 0;

for(let i = 0; i < cart.articles.length; i++){
  // tomo el precio de una unidad del producto
  const precioUnidad = parseFloat(cart.articles[i].unitCost);
  // tomo la cantidad de unidades del producto
  const cantidadUnidades = parseFloat(cart.articles[i].count);

  // Sumo el subtotal del articulo al subtotal del cart
  costosCart.subtotal.costo += calcArticles(cantidadUnidades, precioUnidad);
}

// Inserto el valor del subtotal del cart en el html
costosCart.subtotal.htmlElement.innerHTML = costosCart.subtotal.costo;
}

// Costo de envío
standar.addEventListener('change', envio);
express.addEventListener('change', envio);
premium.addEventListener('change', envio);

function envio(event){
  envioTotal.innerHTML = Math.round(parseFloat(costosCart.subtotal.costo) * parseFloat(event.target.value));
  document.getElementById("total").innerHTML = parseFloat(costosCart.subtotal.costo) + parseFloat(envioTotal.innerHTML)
};
   
// Funcionalidad Forma de Pago: Desactivaciom de campos no seleccionados.

const tarjetaCreditoRadio = document.getElementById("tarjetaCredito");
const transferenciaBancariaRadio = document.getElementById("transferenciaBancaria");
const numeroTarjetaInput = document.getElementById("numeroTarjeta");
const codigoSeguridadInput = document.getElementById("codigoSeguridad");
const mesSelect = document.getElementById("mes");
const anioSelect = document.getElementById("anio");
const numeroCuentaBancariaInput = document.getElementById("numeroCuentaBancaria");

// Función para deshabilitar campos de tarjeta de crédito
function deshabilitarTarjetaCredito() {
  numeroTarjetaInput.disabled = false;
  codigoSeguridadInput.disabled = false;
  mesSelect.disabled = false;
  anioSelect.disabled = false;
  numeroCuentaBancariaInput.disabled = true;
}

// Función para deshabilitar campos de transferencia bancaria
function deshabilitarTransferenciaBancaria() {
  numeroCuentaBancariaInput.disabled = false;
  numeroTarjetaInput.disabled = true;
  codigoSeguridadInput.disabled = true;
  mesSelect.disabled = true;
  anioSelect.disabled = true;
}

// Agrega eventos "change" a los botones de radio
tarjetaCreditoRadio.addEventListener("change", function () {
  if (tarjetaCreditoRadio.checked) {
    deshabilitarTarjetaCredito();
  }
});

transferenciaBancariaRadio.addEventListener("change", function () {
  if (transferenciaBancariaRadio.checked) {
    deshabilitarTransferenciaBancaria();
  }
});


