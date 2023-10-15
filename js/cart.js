const APIcarrito =
  'https://japceibal.github.io/emercado-api/user_cart/25801.json';
let productCartID = JSON.parse(localStorage.getItem('productCartID'));
let newProductsCart = [];

function eliminarEnDesarrollo() {
  let alerta = document.getElementsByClassName(
    'alert alert-danger text-center'
  );
  alerta[0].remove();
}

function getCarritodeCompras() {
  return fetch(APIcarrito)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((carrito) => {
      return carrito;
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
}

// Función para calcular y actualizar el subtotal
function calcularSubtotal(evento, subtotalElement, unitCost) {
  // Obtiene la cantidad del campo de entrada
  const cantidad = parseInt(evento.target.value);

  // Calcula el subtotal multiplicando el precio unitario por la cantidad
  const subtotal = unitCost * cantidad;

  // Actualiza el contenido del elemento de subtotal en la página
  subtotalElement.textContent = `${subtotal}`;
}

// Calcula el subtotal inicial al cargar la página
// calcularSubtotal();

function crearElementoFilaProducto(article) {
  const fila = document.createElement('tr');
  fila.id = `filaProducto__${article.id}`;
  fila.innerHTML = `
        <td>
        <img src="${article.image}" width="100" alt= "Imagen del articulo">
        </td>
        <td>${article.name}</td>
        <td>${article.currency} ${article.unitCost}</td>
        <td> <input type="number" id="cantidadInput__${article.id}" value="${
    article.count
  }" /></td>
        <td>${article.currency} <span id="subtotal__${article.id}">${
    article.unitCost * article.count
  }</span></td>`;

  // Obtener elemento subtotal desde el elemento fila
  const subtotalElement = fila.querySelector(`#subtotal__${article.id}`);

  // Agrega un evento de entrada al campo de cantidad para llamar a la función calcularSubtotal() cuando cambie el valor
  fila
    .querySelector(`#cantidadInput__${article.id}`)
    .addEventListener('input', (evento) =>
      calcularSubtotal(evento, subtotalElement, article.unitCost)
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
}

document.addEventListener('DOMContentLoaded', function () {
  eliminarEnDesarrollo();
  getCarritodeCompras().then(function (carrito) {
    showCarritodeCompras(carrito);
  });
});

// Función para agregar nuevos productos
function showNewProduct(i) {
  htmlContentToAppendNewProduct = '';

  htmlContentToAppendNewProduct = `
                <tr id="${newProductsCart.id}">
                    <th scope="row"><img src="${newProductsCart.images[0]}" style="max-width: 100px;"></th>
                    <td>${newProductsCart.name}</td>
                    <td id="dolar${i}">${newProductsCart.currency}  ${newProductsCart.cost}</td>
                    <td><input type="number" oninput="calcNewArticles(amount${i}.value,${newProductsCart.cost}, ${i}, '${newProductsCart.currency}')" id="amount${i}" value="1" class="form-control" style="width: 50px;" min="1"></td>
                    <td>USD<label id="price${i}">${newProductsCart.cost}</label></td>
                    <td><button type="button"  onclick="deleteNewArticle(${newProductsCart.id}, ${i})" class="btn btn-danger">Eliminar</button></td>
                </tr>
    `;
  document.getElementById('tbody').innerHTML += htmlContentToAppendNewProduct;
}

for (let i = 0; i < productCartID.length; i++) {
  getJSONData(PRODUCT_INFO_URL + productCartID[i] + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === 'ok') {
      newProductsCart = resultObj.data;
      showNewProduct(i);
    }
  });
}
