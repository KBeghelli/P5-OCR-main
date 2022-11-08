/*
Même système que index.js ? 
fetch("http://localhost:3000/api/products/" + id)
en insérant le nom, description, prix de chaque du produit correspondant à l'id 

let params = new URLSearchParams(document.location.search);
import {urlProductsData} from "index.js";
let idProduct = params.get("id");

function afficherProduit() {
fetch("urlProductsData" + idProduct).then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
}
*/