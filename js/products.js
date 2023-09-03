const cat = localStorage.getItem('catID');
const ORDER_ASC_BY_PRICE = 'AscPrice';
const ORDER_DESC_BY_PRICE = 'DescPrice';
const ORDER_BY_PROD_REL = 'Precio';
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
const search = document.querySelector('.Search-input');

// Arrays donde se cargan los datos recibidos:
let productsArray = [];
let productsArrayInit = [];

function setProductId(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

//Función para mostrar en pantalla (a través del uso del DOM)
function showProductsList() {
  let htmlContentToAppend = '';

  for (let i = 0; i < productsArray.length; i++) {
    let product = productsArray[i]; // Array de products

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
    ) {
      htmlContentToAppend +=
        `
        <div onclick="setProductId(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` +
        product.image +
        `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
        product.name +
        ` - USD ` +
        product.cost +
        `</h4> 
                        <p> ` +
        product.description +
        `</p> 
                        </div>
                        <small class="text-muted">` +
        product.soldCount +
        ` Vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    }
    document.getElementById('cat-list-container').innerHTML =
      htmlContentToAppend;
  }
}

document.addEventListener('DOMContentLoaded', function (e) {
  getJSONData(
    'https://japceibal.github.io/emercado-api/cats_products/' + cat + '.json'
  ).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      productsArray = resultObj.data.products;
      productsArrayInit = resultObj.data.products;
      showProductsList();
    }
  });

  // Filtro
  document.getElementById('sortAsc').addEventListener('click', function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById('sortDesc').addEventListener('click', function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });

  document.getElementById('sortByCount').addEventListener('click', function () {
    sortAndShowProducts(ORDER_BY_PROD_REL);
  });

  // Botón limpiar
  document
    .getElementById('clearRangeFilter')
    .addEventListener('click', function () {
      document.getElementById('rangeFilterCountMin').value = '';
      document.getElementById('rangeFilterCountMax').value = '';

      minCount = undefined;
      maxCount = undefined;

      showProductsList();
    });

  // Filtrar productos por mínimo y máximo de precios
  document
    .getElementById('rangeFilterCount')
    .addEventListener('click', function () {
      minCount = document.getElementById('rangeFilterCountMin').value;
      maxCount = document.getElementById('rangeFilterCountMax').value;

      if (minCount != undefined && minCount != '' && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != '' && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showProductsList();
    });
});

function sortAndShowProducts(sortCriteria, productsArrays) {
  currentSortCriteria = sortCriteria;

  if (productsArrays != undefined) {
    productsArray = productsArrays;
  }

  productsArray = sortProducts(currentSortCriteria, productsArray);

  // Muestra la lista de forma ordenada
  showProductsList();
}

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_REL) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

/**
 * Obtener productos
 *
 * Le pide a la api el listado de productos de la categoría solicitada.
 * Retorna una promesa que al cumplirse devuelve un objeto del tipo Category
 */
async function getProducts() {
  const idCategory = localStorage.getItem('catID'); // id de la categoría
  try {
    // Pide a la API la lista de productos en la categoría espera a que
    // se resuelva la promesa y guarda la respuesta "cruda" en una constante
    const respuestaAPI = await fetch(
      `https://japceibal.github.io/emercado-api/cats_products/${idCategory}.json`
    );
    // Parsea la respuesta y la retorna
    // Nota: En realidad retorna una promesa (usar await o .then())
    return respuestaAPI.json();
  } catch (error) {
    alert(error);
  }
}

/** Generar elemento de item
 *
 * Recibe un objeto de tipo Product (como un Auto).
 * Retorna un elemento del DOM con las caracteristicas de un auto.
 * Ejemplo: que retorne un elem tal que elem.innerHTML == <div>Marca: Wolkswagen Modelo: Gol<div>.
 */
function generarElementoDeProduct(product) {
  let htmlContentToAppend = `<li class="container">
    <section class="row d-flex w-100 justify-content-between">
      <div class="col">${product.name}</div>
      <div class="col">${product.currency}${product.cost}</div>
    </section>
    <section class="row">
      <div class="col">
        <div>${product.description}</div>
        <div>Cantidad vendidos: ${product.soldCount}</div>
      </div>
      <div class="col"><img class="col-4" src=${product.image}></div>
    </section>
  </li>`; /*aca va el contenido html que se generara para mostrar el producto*/

  let productDOM = document.createElement('div'); //aca se crea el elemento del dom que incluira el contenido html
  productDOM.id = product.id; // se agrega el id al div
  productDOM.innerHTML = htmlContentToAppend; //aca se actualiza el contenido del elemento con el contenido de htmlContentToAppends
  return productDOM;
}

/**
 * Genera un elemento del DOM con una lista de elementos con datos
 * de los Productos a partir de un arreglo de Productos
 *
 * Lista en pantalla una lista de items
 */
function generarElementoListaItems(listaDeItems) {
  const listaProductos = document.createElement('ol');
  for (let i = 0; i < listaDeItems.length; i++)
    listaProductos.appendChild(generarElementoDeProduct(listaDeItems[i]));
  listaProductos.style = 'list-style: none';
  return listaProductos;
}

/**
 * Eliminar alerta de "En desarrollo"
 *
 * Busca y elimina la alerta en rojo de "Funcionalidad en desarrollo".
 */
function eliminarEnDesarrollo() {
  let alerta = document.getElementsByClassName(
    'alert alert-danger text-center'
  );
  alerta[0].remove();
}

function mostrarListaItems(listaDeItems) {
  const listaDeProductos = generarElementoListaItems(listaDeItems);
  const contenedorDeLista = document.getElementById('contenedor-productos');
  contenedorDeLista.appendChild(listaDeProductos);
}

/**
 * Muestra, dentro de un elemento contenedor del HTML, todos
 * los objetos Product de la Category cars (id 101)
 *
 */
async function printAllProducts() {
  try {
    const categoriaProductos = await getProducts();
    mostrarListaItems(categoriaProductos.products);
  } catch (error) {
    alert(error);
  }
}

// Llamados a las funciones luego de que el DOM se cargue
document.addEventListener('DOMContentLoaded', () => {
  eliminarEnDesarrollo();
  printAllProducts();
});

// Buscar productos
// Obtener una lista de todos los elementos de producto
const productos = document.querySelectorAll('.custom-card');
// Obtener el elemento de entrada de búsqueda
const searchInput = document.getElementById('searchInput');
// Agregar un evento de entrada al campo de búsqueda
searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.ariaValueMax.toLowerCase();
  // Recorrer todos los elementos de producto y ocultar los que no coinciden con la búsqueda
  productos.forEach((producto) => {
    const titulo = producto.querySelector('h3').textContent.toLowerCase();
    const descripcion = producto
      .querySelector('.card-text')
      .textContent.toLowerCase();
    if (titulo.includes(searchTerm) || descripcion.includes(searchTerm)) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
});
