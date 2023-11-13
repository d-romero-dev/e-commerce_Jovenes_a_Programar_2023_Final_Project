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
  const imageInput = document.getElementById("image-input");
  const profileImage = document.getElementById("imagen-de-perfil");

  //Obtener la imagen guardada en localStore al recargar la página.

  const storedImage = localStorage.getItem("profileImage");

  if (storedImage) {
    profileImage.src = storedImage;
  } else {
    profileImage.src = "img/profile-picture-default.png";
  }

  //Se cambia la imagen de perfil mostrada al cambiar el elemento input de "Imagen de Perfil".

  imageInput.addEventListener("change", function () {

    // Se obtiene el primer archivo seleccionado por el Usuario:
    // Se verifica si existe imageInput.files y si tiene al menos un archivo.

    const newImage = imageInput.files && imageInput.files[0];

    
    //Se verifica si newImage tiene valor, si lo tiene , el Usuario habra seleccionado un archivo.
    if (newImage) {

      const reader = new FileReader(); //Se genera una instancia del objeto FileReader para leer el contenido de archivos.

      reader.onload = function (e) { // Manejador de Eventos: Cuando FileReader haya cargado el contenido de la imagen.

        const base64Image = e.target.result;  //e: evento ocurrido "load"- target: objetivo del evento: "FileReader" -result: contiene la representación en formato Base64 de la imagen.
      
        localStorage.setItem("profileImage", base64Image);
        profileImage.src = base64Image;

        alert("Imagen cambiada con Éxito!");
      };

      reader.readAsDataURL(newImage);
    }
  });
});


