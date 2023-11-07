
function eliminarEnDesarrollo() {
    let alerta = document.getElementsByClassName(
      'alert alert-danger text-center'
    );
    alerta[0].remove();
  }

  document.addEventListener("DOMContentLoaded", function(){
    eliminarEnDesarrollo();
  })