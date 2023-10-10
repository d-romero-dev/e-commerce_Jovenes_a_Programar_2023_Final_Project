const APIcarrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

function eliminarEnDesarrollo() {
    let alerta = document.getElementsByClassName(
        'alert alert-danger text-center'
    );
    alerta[0].remove();
}

function getCarritodeCompras() {
    return fetch(APIcarrito)
        .then(response => {if (response.ok){
            return response.json();
        }else{
            throw Error(response.statusText);
        }})
        .then(carrito => {
            return carrito;
        })
        
        .catch((error) => {
            console.error("Error: ", error);
        });

       

}

function showCarritodeCompras(carrito) {
    const carritoContainer = document.getElementById("carritoContainer");
    let htmlContentToAppend = `
        <div class="text-center p-4"> 
            <h1> Carrito de compras </h1>
        </div> 
        <h3> Articulos a comprar</h3>
       
        <table class="table">
            <tr>
                <th> Imagen</th>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
            <tr>
                <td>
                <img src="${carrito.articles[0].image}" width="100" alt= "Imagen del articulo">
                </td>
                <td >${carrito.articles[0].name}</td>
                <td>${carrito.articles[0].currency} ${carrito.articles[0].unitCost}</td>
                <td> <input type="number" value="${carrito.articles[0].count}" /></td>
                <td>${carrito.articles[0].currency} ${carrito.articles[0].unitCost * carrito.articles[0].count}</td>
            
            </tr>
        </table>

    `
    carritoContainer.innerHTML = htmlContentToAppend;

}

document.addEventListener("DOMContentLoaded", function () {
    eliminarEnDesarrollo();
    getCarritodeCompras()
    .then (function (carrito){
        showCarritodeCompras(carrito);
    })
    
});

