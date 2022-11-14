
let params = (new URL(document.location)).searchParams;
let idProduct = params.get("id");

const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const image = document.querySelector("article div.item__img");


fetch('http://localhost:3000/api/products/' + idProduct)
  .then(res => res.json())
  .then(data => {
    image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    title.innerText = `${data.name}`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    for (let color of data.colors) {
      colors.innerHTML += `<option value=
                          "${color}">${color}
                          </option>`;
    }

  })
  .catch(_error => {
    alert('BUG');
  });

/**********************************************************************************************************/

/* FONCTION D'AJOUT AU PANIER
* On sélectionne le bouton AddToCart, et on écoute ses évènements
* Si les données entrées sont valides (quantité entre 1 et 100 et couleur sélectionné), 
* alors on affiche un message "Produit ajouté au panier !" et on appelle une fonction d'ajout au panier,
* sinon (si quantité ou couleur non sélectionné par exemple), afficher message d'erreur
*/

/*const idQuantity = document.getElementById('quantity');
const idColors = document.getElementById('colors');

const addToCart = document.getElementById('addToCart');

addToCart.addEventListener("click", () => {
if

}) */

/* Comme préciser dans le "guide des étapes clés" : 
* "Nous devons récupérer un array contenant trois choses : l'id, la quantité et la couleur du produit", 
* pour ensuite pouvoir ajouter cette array au panier
* Je vais donc créer une nouvelle variable vide, prête à contenir cette array. Je vais immédiatement y ajouter
* l'id du produit que nous connaissons déjà, et ensuite ajouter des EventListener sur la quantité et la couleur
* pour connaitre la sélection de l'utilisateur */

let chosenProduct = {};
chosenProduct._id = idProduct;