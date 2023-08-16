/**
 * Obtener autos
 *
 * Le pide a la api el listado de productos de la categoría autos (id 101).
 * Retorna una promesa que al cumplirse devuelve un objeto del tipo Category
 */
async function getCars() {
  return fetch(
    'https://japceibal.github.io/emercado-api/cats_products/101.json'
  ).then((response) => response.json());
}

/** Generar elemento de item
 *
 * Recibe un objeto de tipo Product (como un Auto).
 * Retorna un elemento del DOM con las caracteristicas de un auto.
 * Ejemplo: que retorne un elem tal que elem.innerHTML == <div>Marca: Wolkswagen Modelo: Gol<div>.
 */
function generarElementoDeProduct(producto) {}

/**
 * Genera un elemento del DOM con una lista de elementos con datos
 * de los Productos a partir de un arreglo de Productos
 *
 * Lista en pantalla una lista de items
 */
function generarElementoListaItems(listaDeItems) {
  // iterar sobre mostrarAuto
}

/**
 * Eliminar alerta de "En desarrollo"
 *
 * Busca y elimina la alerta en rojo de "Funcionalidad en desarrollo".
 */
function eliminarEnDesarrollo() {}

function mostrarListaItems(listaDeItems) {
  const elementoDelDom = generarElementoListaItems(listaDeItems);
  const contenedorDeLista = document.getElementById('contenedor-de-lista');
  // ... seguir
}

/**
 * Muestra, dentro de un elemento contenedor del HTML, todos
 * los objetos Product de la Category cars (id 101)
 *
 */
async function printAllcars() {
  try {
    const categoriaAutos = await getCars();
    // llamar a todas funciones necesarias
    listItems();
  } catch (error) {
    alert(error);
  }
}

// Llamados a las funciones luego de que el DOM se cargue
document.addEventListener('DOMContentLoaded', () => {
  printAllcars();
});
