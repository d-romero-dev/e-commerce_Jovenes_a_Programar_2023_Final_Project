
function eliminarEnDesarrollo() {
    let alerta = document.getElementsByClassName(
      'alert alert-danger text-center'
    );
    alerta[0].remove();
  }

  document.addEventListener("DOMContentLoaded", function(){
    eliminarEnDesarrollo();
  })

  //EventListener para escuchar el cambio de imagen al seleccionar un arhivo nuevo. Se verifica que existan archivos guardados
  // y se almacena en localStorage un objeto contenedor de la nueva imagen.
  

  document.addEventListener('DOMContentLoaded', function(){

  const imageInput = document.getElementById('image-input');
  const profileImage = document.getElementById('imagen-de-perfil');


  //Obtener la imagen guardada en localStore al recargar la página.

  const storedImage = localStorage.getItem('profileImage');

  if(storedImage){
    profileImage.src = storedImage;
  }
  else{
    profileImage.src = "img/profile-picture-default.png"
  }


  //Se cambia la imagen de perfil mostrada al cambiar el elemento input de "Imagen de Perfil".
 
     imageInput.addEventListener('change', function(){

      if(imageInput.files && imageInput.files[0]){

        let newImage = imageInput.files[0];
        const imageURL = URL.createObjectURL(newImage);

        localStorage.setItem('profileImage', imageURL);
        profileImage.src = imageURL;

        alert("Imagen cambiada con Éxito!");

      }
    })
  })

