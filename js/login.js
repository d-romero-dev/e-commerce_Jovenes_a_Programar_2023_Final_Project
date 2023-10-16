// Function del Login:

function ingresar() {
  let user = document.getElementById('user').value;

  let pass = document.getElementById('pass').value;

  if (user.length > 0 && pass.length > 0) {
    localStorage.setItem('user', user);

    setUserIsLogged(true);

    window.location.href = 'index.html';
  }
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
  document.getElementById('login').addEventListener('click', function () {
    ingresar();
  });
});
