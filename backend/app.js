const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

function readJsonFileSync(filepath, encoding) {
  if (typeof encoding == 'undefined') {
    encoding = 'utf8';
  }

  let file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

// const CATEGORIES_URL = 'https://japceibal.github.io/emercado-api/cats/cat.json';

// const PUBLISH_PRODUCT_URL = https://japceibal.github.io/emercado-api/sell/publish.json';

// const PRODUCTS_URL = 'https://japceibal.github.io/emercado-api/cats_products/';

// const PRODUCT_INFO_URL = 'https://japceibal.github.io/emercado-api/products/';

// const PRODUCT_INFO_COMMENTS_URL ='https://japceibal.github.io/emercado-api/products_comments/';

// const CART_INFO_URL = 'https://japceibal.github.io/emercado-api/user_cart/';

// const CART_BUY_URL = 'https://japceibal.github.io/emercado-api/cart/buy.json';

// const EXT_TYPE = '.json';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// CATEGORIES_URL
// Retorna todas las categorías del ecommerce
app.get('/emercado-api/cats/cat.json', (req, res) => {
  res.send(readJsonFileSync('./json/cats/cat.json'));
});

// PUBLISH_PRODUCT_URL
// Retorna la respuesta a intentar crear una publicacion ?
app.get('/emercado-api/sell/publish.json', (req, res) => {
  res.send(readJsonFileSync('./json/sell/publish.json'));
});

// PRODUCTS_URL
// Retorna los productos de una categoría
app.get('/emercado-api/cats_products/:idCategoria', (req, res) => {
  res.send(
    readJsonFileSync('./json/cats_products/' + req.params.idCategoria + '.json')
  );
});

// PRODUCT_INFO_URL
app.get('/emercado-api/cats/products/:idProducto', (req, res) => {
  res.send(
    readJsonFileSync('./json/products/' + req.params.idProducto + '.json')
  );
});

// PRODUCT_INFO_COMMENTS_URL
app.get('/emercado-api/cats/products_comments/:idProducto', (req, res) => {
  res.send(
    readJsonFileSync(
      './json/products_comments/' + req.params.idProducto + '.json'
    )
  );
});

// CART_INFO_URL
app.get('/emercado-api/user_cart/', (req, res) => {
  res.send(readJsonFileSync('./json/user_cart/25801.json'));
});

// CART_BUY_URL
app.get('/emercado-api/cart/buy.json', (req, res) => {
  res.send(readJsonFileSync('./json/cart/buy.json'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
