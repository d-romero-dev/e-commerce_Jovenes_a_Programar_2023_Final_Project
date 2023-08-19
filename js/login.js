/**
 * Obtener estado de logged del usuario
 *
 * Obtiene del localStorage el valor de la data de key 'userIsLogged' en el localStorage
 */
function userIsLogged() {
  return localStorage.getItem('userIsLogged');
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
