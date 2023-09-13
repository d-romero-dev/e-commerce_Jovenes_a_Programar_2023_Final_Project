let productsInfoArray = []; 

function setProductId(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
} 

async function getProductInfo () {
    const idProduct = localStorage.getItem("productID"); // Guarda el id del producto del almacenamiento local
    
    try {
        const productInfo = await fetch (`https://japceibal.github.io/emercado-api/products/${idProduct}.json`); // Solicita al servidor para obtener la información del producto
        const product = await productInfo.json(); // Convierte la respuesta a JSON
        return product
        
       
    } catch (error) {
        alert(error)
    }

}

function mostrarProductInfo (product){
     // Muestra la información en la página

     document.getElementById('product-name').innerHTML= product.name;
     document.getElementById('product-price').innerHTML = product.cost;
     document.getElementById('product-description').innerHTML = product.description; 
     document.getElementById('product-category').innerHTML = product.category;
     document.getElementById('product-soldcount').innerHTML = product.soldCount;
     document.getElementById('product-image').innerHTML = product.image;
}



function eliminarEnDesarrollo() {
    let alerta = document.getElementsByClassName(
      'alert alert-danger text-center'
    );
    alerta[0].remove();
  }



function showProductsInfo() {
    let htmlContentToAppend = "";

        let productInfo = productsInfoArray; 

        htmlContentToAppend += `
        <div class="">
            <div class="row">
                <div class="">
                <div class=" w-100 justify-content-between">
                <div class="mb-1">
                <br>
                <div class="row">
                <div class="col-md-4">
                <h1>`+ productInfo.name +`</h1>
                </div>
                <hr>
                <h3>Precio</h3>
                <p>`+ productInfo.cost + `</p>
                <h3>Descripción</h3>
                <p>`+ productInfo.description + `</p>
                <h3>Categoría</h3>
                <p>`+ productInfo.category + `</p>
                <h3>Cantidad de vendidos</h3>
                <p>`+ productInfo.soldCount + `</p>
                <h3>Imágenes ilustrativas</h3>
                <div id="arrowCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div class="carousel-inner">
                    ${productinfo.images.map((ima) => {
                        if (ima === productInfo.images[0]){
                            return `<div class="carousel-item active" data-bs-interval="2000"><img src="${ima}" alt="product image" class="img-thumbnail"></div>`
                        } else {
                            return `<div class="carousel-item" data-bs-interval="2000"><img src="${ima}" alt="product image" class="img-thumbnail"></div>`
                        }
                    }).join(" ")}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#arrowCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#arrowCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
</div>
`                   
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + productID).then(function(resultObj){
        if (resultObj.status === "ok") 
        {
            productsInfoArray = resultObj.data;
            showProductsInfo();
            eliminarEnDesarrollo();
        }
    })
});
