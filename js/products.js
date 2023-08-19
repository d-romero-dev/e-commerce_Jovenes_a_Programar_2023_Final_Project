/**
 * Obtener autos
 *
 * Le pide a la api el listado de productos de la categoría autos (id 101).
 * Retorna una promesa que al cumplirse devuelve un objeto del tipo Category
 */
async function getCars() {
  const idCategoryCars = 101; // id de la categoría autos
  try {
    // Pide a la API la lista de productos en la categoría espera a que
    // se resuelva la promesa y guarda la respuesta "cruda" en una constante
    const respuestaAPI = await fetch(
      `https://japceibal.github.io/emercado-api/cats_products/${idCategoryCars}.json`
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
function eliminarEnDesarrollo() {
  let alerta = document.getElementsByClassName(
    'alert alert-danger text-center'
  );
  alerta[0].remove();
}

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
async function printAllCars() {
  try {
    const categoriaAutos = await getCars();
    mostrarListaItems(categoriaAutos);
  } catch (error) {
    alert(error);
  }
}

// Llamados a las funciones luego de que el DOM se cargue
document.addEventListener('DOMContentLoaded', () => {
  eliminarEnDesarrollo();
  printAllCars();
});
