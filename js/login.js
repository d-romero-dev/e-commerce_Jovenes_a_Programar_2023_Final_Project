const APIcarritoURL =
  'https://japceibal.github.io/emercado-api/user_cart/25801.json';

// Function del Login:

async function ingresar() {
  let user = document.getElementById('user').value;

  let pass = document.getElementById('pass').value;

  // traer carrito y guardarlo en el localStorage

  if (user.length > 0 && pass.length > 0) {
    localStorage.setItem('user', user);
    let carrito = await getCarritoDeCompras();
    localStorage.setItem('cart', JSON.stringify(carrito));
    setUserIsLogged(true);

    window.location.href = 'index.html';
  }
}

// Obtiene el carrito de compras del usuario desde la API
async function getCarritoDeCompras() {
  return fetch(APIcarritoURL)
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

// EventListener para detectar el click en login.html y redirigir a index.html

document.addEventListener('DOMContentLoaded', function () {
  if (userIsLogged()) {
    window.location.href = 'index.html';
  }

  document.getElementById('login').addEventListener('click', function () {
    ingresar();
  });
});

/**
 * Obtener estado de logged del usuario
 *
 * Obtiene del localStorage el valor de la data de key 'userIsLogged' en el localStorage
 */
function userIsLogged() {
  return localStorage.getItem('userIsLogged') === 'true';
}

/**
 * Cambiar estado de logged del usuario
 *
 * Cambia el valor de la data de key 'userIsLogged' en el localStorage
 * a true o false acorde a lo ingresado como parametro.
 */
function setUserIsLogged(isLogged) {
  // Doble negación para evita asignar algo que no sea Bool
  localStorage.setItem('userIsLogged', !!isLogged);
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('login').addEventListener('click', async function () {
    ingresar();
  });
});
