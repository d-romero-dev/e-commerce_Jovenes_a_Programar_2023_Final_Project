const commentFormId = 'comentar'; // id del form para ingresar comentarios
const commentsContainerId = 'comentarios'; // id del contenedor de comentarios

/**
 * @typedef {object} comment
 *
 * @property {Number} product id del producto
 * @property {Number} score calificacion del producto
 * @property {String} description descripcion del producto
 * @property {String} user username del autor del comentario
 * @property {String} dateTime fecha de creacion del comentario
 */

/**
 * Generar elemento de estrellas de calificacion
 *
 * @param {Number} calificacion
 * @param {Number} maxCalificacion opcional, 5 es el valor por default
 * @returns
 */
function crearElementoCalificacion(calificacion, maxCalificacion = 5) {
  const estrellaLlena = '★';
  const estrellaVacia = '☆';
  const domCalificacion = document.createElement('div');

  let estrella;
  for (let nEstrella = 1; nEstrella < maxCalificacion; nEstrella++) {
    estrella = document.createElement('span');
    if (calificacion > nEstrella) estrella.innerHTML = estrellaLlena;
    else estrella.innerHTML = estrellaVacia;
    domCalificacion.appendChild = estrella;
  }

  return domCalificacion;
}

/**
 * Generar elemento de comentario
 *
 * Recibe un objeto de tipo comment, usa sus datos para crear un elemento del DOM de un comentario.
 * No valida que la estructura y contenido del comentario sean adecuadas.
 * @param {comment} comment comentario de un usuario sobre un producto
 * @returns {Element} elemento del dom de un comentario
 */
function crearElementoComentario(comment) {
  const domComment = document.createElement('div');

  // crear un elemento para cada dato del comentario
  const elementoCalificacion = crearElementoCalificacion(comment.score);
  const elementoDescripcion = document.createElement('p');
  elementoDescripcion.textContent = `${comment.description}`;
  const elementoNombreUsuario = document.createElement('span');
  elementoNombreUsuario.textContent = `${comment.user}`;
  const elementoFechaCreacion = document.createElement('span');
  elementoFechaCreacion.textContent = `${comment.dateTime}`;

  domComment
    .appendChild('div')
    .append([
      elementoNombreUsuario,
      elementoFechaCreacion,
      elementoCalificacion,
    ]);

  domComment.appendChild('div').append([elementoDescripcion]);
}

/**
 * Obtener datos del nuevo comentario
 *
 * Obtiene los datos de un nuevo comentario a partir de los inputs del registro de comentario.
 *
 * @returns {comment}
 */
function getDatosNuevoComentario() {
  const datosComentario = {};
  datosComentario.product = localStorage.getItem('product');
  datosComentario.score = document.getElementById('inputScore').value;
  datosComentario.description =
    document.getElementById('inputDescription').value;
  datosComentario.user = document.getElementById('inputUser').value;
  datosComentario.dateTime = document.getElementById('inputDateTime').value;
  return datosComentario;
}

/**
 * Mostrar nuevo comentario
 *
 * Inserta en la vista el elemento del dom del nuevo comentario a partir de los datos del registro del mismo
 */
function mostrarNuevoComentario() {
  const dataComentario = getDatosNuevoComentario();
  const domComentario = crearElementoComentario(dataComentario);
  const contenedorComentarios = document.getElementById(commentsContainerId);
  contenedorComentarios.appendChild(domComentario);
}

/**
 * Registro de comentario
 *
 * Event listener para el registro de un nuevo comentario
 *
 * @param {Event} evento
 */
function registroDeComentario(evento) {
  evento.preventDefault();
  mostrarNuevoComentario();
}
