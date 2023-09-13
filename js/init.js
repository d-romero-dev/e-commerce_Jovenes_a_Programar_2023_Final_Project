const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
/**
 * Obtener estado de logged del usuario
 *
 * Obtiene del localStorage el valor de la data de key 'userIsLogged' en el localStorage
 */
function userIsLogged() {
  return localStorage.getItem('userIsLogged') === "true";
}

document.addEventListener("DOMContentLoaded", function () {
  if (!userIsLogged()) {
    window.location.href = "login.html";
  }
  botonCerrarSesion= document.getElementById("cerrarSesion")
  botonCerrarSesion.addEventListener("click", () => {
    setUserIsLogged(false);
    window.location.href = "login.html";
  } )
}); 

function setUserIsLogged(isLogged) {
  // Doble negación para evita asignar algo que no sea Bool
  localStorage.setItem('userIsLogged', !!isLogged);
}



document.addEventListener('DOMContentLoaded', function () {
  // Verifica si el usuario ya está logueado
  if (userIsLogged()) {
    const username = localStorage.getItem("user");
    // Si está logueado muestra el nombre guardado en el almacenamiento local 
    document.getElementById("cerrarSesion").textContent = "Cerrar Sesión de " + username[0].toUpperCase() + username.slice(1).toLowerCase();
  }

  document.getElementById('cerrarSesion').addEventListener('click', function () {
    // Al hacer clic en "Cerrar Sesión", elimina el nombre de usuario del almacenamiento local
    localStorage.removeItem("user");
    // Redirige a la página de inicio de sesión o donde lo necesites
    window.location.href = "login.html";
  });
});


