/*const test = document.getElementById('title');
test.textContent = "Ceci est un test";*/


let params = (new URL(document.location)).searchParams;
let idProduct = params.get("id");

const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');


// je crée la bonne URL pour chaque produit choisi en ajoutant newID
fetch("http://localhost:3000/api/products/" + idProduct)
  .then(res => res.json())
  .then(data => {
    title.innerHTML = `${data.name}`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    // je configure le choix des couleurs 
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })
    // j'ajoute un message au cas où le serveur ne répond pas
  .catch(_error => {
    alert('BUG');
  });
