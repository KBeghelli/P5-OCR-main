//variables globales

let params = new URLSearchParams(document.location.search);
let urlProductsData = 'http://localhost:3000/api/products/';
let idProduct = params.get("id");

//variables spécifiques au produit

const imageProduct = document.getElementsByClassName('item_img');
const titleProduct = document.getElementById('title');
const priceProduct = document.getElementById('price');
const descriptionProduct = document.getElementById('description');


fetch("urlProductsData" + idProduct)
    .then(res => res.json())
    .then(data => {
        //priceProduct.textcontent = this.data.price;
        descriptionProduct.innerHTML = `${data.description}`;

        //let titleProduct = document.getElementById('title');
        //titleProduct.innerHTML = data.name;
    })
    .catch((err) => {
        console.error(err);
    });

