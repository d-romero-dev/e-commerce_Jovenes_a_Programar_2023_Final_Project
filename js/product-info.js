

//Función encargada de Mostrar en pantalla la calificación generada en Comentarios.
document.addEventListener("DOMContentLoaded", function () {

    let dropdownItems = document.querySelectorAll(".dropdown-item");
    
    let selectedRating = document.getElementById("selectedRating");

    dropdownItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            let rating = event.target.getAttribute("data-value");
            selectedRating.innerHTML = "Calificación seleccionada: " + "⭐".repeat(rating);
        });
    });
});
