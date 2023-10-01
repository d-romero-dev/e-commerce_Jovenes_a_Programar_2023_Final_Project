const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
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

function setUserIsLogged(isLogged) {
  // Doble negación para evita asignar algo que no sea Bool
  localStorage.setItem('userIsLogged', !!isLogged);
}

//Genera un menu desplegable en el boton de nombre de usuario
function generarMenuDesplegable() {
  const username = localStorage.getItem("user");
  let htmlContentToAppend = `
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    `+
    username[0].toUpperCase() + username.slice(1).toLowerCase() 
    +
    `
    </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" id="cierreDeSesion" >Cerrar sesión</a></li>
  </ul>
  `
  
  let barraNavegacion = document.querySelector("#navbarNav>ul:first-child");
  let menuDesplegable = document.createElement("li");
  menuDesplegable.className = "nav-item dropdown"; 
  menuDesplegable.innerHTML = htmlContentToAppend;
  barraNavegacion.appendChild(menuDesplegable)

  botonCerrarSesion = document.getElementById("cierreDeSesion");
  botonCerrarSesion.addEventListener("click", () => {
     
    Swal.fire({
      title: "¿Cerrar Sesión?",
      text: "ATENCIÓN: ¿Desea cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No, cancelar'
     }).then((result)=> {
      if (result.isConfirmed){
        localStorage.removeItem("user");
        setUserIsLogged(false);
        window.location.href="login.html";
      }

     })

  
  })
}

document.addEventListener("DOMContentLoaded", function () {
  if (!userIsLogged()) {
    window.location.href = "login.html";
  }
  // Verifica si el usuario ya está logueado
  if (userIsLogged()) {
    // Si está logueado muestra button, con el nombre guardado en el almacenamiento local y un dropdown
    generarMenuDesplegable();
  }
});
