const form = document.querySelector("form");
const nombreInput = document.getElementById("name1");
const apellidoInput = document.getElementById("lastname1");
const telefonoInput = document.getElementById("number");
const nombre2Input = document.getElementById("name2");
const apellido2Input = document.getElementById("lastname2");


function eliminarEnDesarrollo() {
  let alerta = document.getElementsByClassName(
    "alert alert-danger text-center"
  );
  alerta[0].remove();
}

document.addEventListener("DOMContentLoaded", function () {
  eliminarEnDesarrollo();
});

function guardarDatos() {
  // Función para validar y guardar en el almacenamiento local
  if (
    !nombreInput.value.trim() ||
    !apellidoInput.value.trim() ||
    !telefonoInput.value.trim()
  ) {
    // Verifica que los campos obligatorios estén completos
    alert("Completa los campos obligatorios");
    return;
  }

  const datosUsuario = {
    // Si los campos obligatorios están completos, los guarda en el almacenamiento local
    nombre: nombreInput.value,
    nombre2: nombre2Input.value,
    apellido: apellidoInput.value,
    apellido2: apellido2Input.value,
    telefono: telefonoInput.value,
  };

  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

  alert("Se han guardado tus datos correctamente.");
}

form.addEventListener("submit", function (event) {
  // Maneja la validación y guarda los datos del formulario
  event.preventDefault(); // Evita la recarga de la página al enviar el formulario
  guardarDatos();
});

const datosGuardados = localStorage.getItem("datosUsuario"); // Carga los datos desde el almacenamiento local cuando se carga la página
if (datosGuardados) {
  const datosUsuario = JSON.parse(datosGuardados);
  nombreInput.value = datosUsuario.nombre || "";
  nombre2Input.value = datosUsuario.nombre2 || "";
  apellidoInput.value = datosUsuario.apellido || "";
  apellido2Input.value = datosUsuario.apellido2 || "";
  telefonoInput.value = datosUsuario.telefono || "";
}

//EventListener para escuchar el cambio de imagen al seleccionar un arhivo nuevo. Se verifica que existan archivos guardados
// y se almacena en localStorage un objeto contenedor de la nueva imagen.

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const imageInput = document.getElementById("image-input");
  const profileImage = document.getElementById("imagen-de-perfil");

  // Cargar el email del usuario del localStorage
  const userEmail = localStorage.getItem("user");
  if (userEmail) {
    emailInput.value = userEmail;
  }

  //Obtener la imagen guardada en localStore al recargar la página.

  const storedImage = localStorage.getItem("profileImage");

  if (storedImage) {
    profileImage.src = storedImage;
  } else {
    profileImage.src = "img/profile-picture-default.png";
  }

  //Se cambia la imagen de perfil mostrada al cambiar el elemento input de "Imagen de Perfil".

  imageInput.addEventListener("change", function () {
    if (imageInput.files && imageInput.files[0]) {
      let newImage = imageInput.files[0];
      const imageURL = URL.createObjectURL(newImage);

      localStorage.setItem("profileImage", imageURL);
      profileImage.src = imageURL;

      alert("Imagen cambiada con Éxito!");
    }
  });
});