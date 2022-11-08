//variables globales

let params = new URLSearchParams(document.location.search);
let urlProductsData = 'http://localhost:3000/api/products/';
let idProduct = params.get("_id");

//variables spécifiques au produit

const imageProduct = document.getElementsByClassName('item_img');
const titleProduct = document.getElementById('title');
const priceProduct = document.getElementById('price');
const descriptionProduct = document.getElementById('description');

afficherProduit()

function afficherProduit() {
    fetch("urlProductsData" + idProduct)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            priceProduct.textcontent = this.data.price;
            descriptionProduct.innerText = `${data.description}`;
        })
        .catch((err) => {
            console.error(err);
        });
}
