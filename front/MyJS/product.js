
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

/* Comme préciser dans le "guide des étapes clés" : 
* "Nous devons récupérer un array contenant trois choses : l'id, la quantité et la couleur du produit", 
* pour ensuite pouvoir ajouter cette array au panier
* Je vais donc créer une nouvelle variable vide, prête à contenir cette array. Je vais immédiatement y ajouter
* l'id du produit que nous connaissons déjà, et ensuite ajouter des EventListener sur la quantité et la couleur
* pour connaitre la sélection de l'utilisateur */

let clientCart = {};
clientCart._id = idProduct;


// Couleur

let productColor = document.getElementById('colors');
productColor.addEventListener("change", (test) => {
  let exempleColor = test.target.value;
  clientCart.colors = exempleColor;
  clientCart.price = document.getElementById('price').textContent;
  clientCart.name = document.getElementById('title').textContent;
});

// Quantité

let productQuantity = document.getElementById('quantity');
productQuantity.addEventListener("input", (essai) => {
  let exempleQuantity = essai.target.value;
  clientCart.quantity = exempleQuantity;

});

const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

/* clientCart est désormais un array contenant l'id du produit, et la couleur/quantité sélectionné
par l'utilisateur */

/*********************************************************************************************************/

/* FONCTION D'AJOUT AU PANIER
* On sélectionne le bouton AddToCart, et on écoute ses évènements
* Si les données concernant quantité et couleurs validé par l'utilisateur sont erronés 
* (quantité ou couleur non sélectionné par exemple), alors on affiche un message d'erreur, 
* sinon, on utilise la fonction pushLocalStorage, qui va rentrer ces donnés dans le local storage
*/

const addToCart = document.getElementById('addToCart');

addToCart.addEventListener("click", () => {

  /* On initialise une variable, chosenProduct, qui récupère dans le LS 
  *  tous les produits ajoutés par le client */
  let chosenProduct = JSON.parse(localStorage.getItem("produit"));
  console.log(chosenProduct);
  /* Une condition pour vérifier que la couleur/quantité de l'objet que tente d'ajouter l'utilisateur
  * en appuyant sur le bouton addToCart est une donnée valide, si oui,
  * la fonction continue, si non, elle affiche un message d'erreur et s'arrête avec return
  */
  if (
    clientCart.quantity < 1 ||
    clientCart.quantity > 100 ||
    clientCart.quantity === undefined ||
    clientCart.colors === undefined ||
    clientCart.colors === ""
  ) {
    alert("Quelque chose s'est mal passé ! Veuillez indiquer la couleur et la quantité désiré !");
    return;
  }

  // Fonction d'ajout dans le tableau clientCart de l'objet choisi par l'utilisateur
  
  function pushLocalStorage() {
    chosenProduct.push(clientCart);
    localStorage.setItem("produit", JSON.stringify(chosenProduct))
  }

  // A ce stade, chosenProduct renvoie null

  if (chosenProduct) {
    pushLocalStorage()
  }

  // Si il n'y a pas de produit dans le LS
  else {
    chosenProduct = [];
    pushLocalStorage()
  }
})
