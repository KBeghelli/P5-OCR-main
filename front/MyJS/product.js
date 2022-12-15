// Utilisation de searchParams pour récupérer l'ID produit de la page
let params = (new URL(document.location)).searchParams;
// Création de variable utilisé pour fetch le bon produit, et pour ensuite l'envoyer dans le panier
let idProduct = params.get("id");

const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const image = document.querySelector("article div.item__img");

/* Création de imagePath et imageAltTxt vide, qui seront remplis pendant le fetch de l'api
Utile au moment de l'envoie des objets dans le LocalStorage : Pouvoir envoyer l'objet avec son id, price,
imagePath etc, bref toutes ses clés/valeurs, c'est préférable/plus simple d'envoyer toutes ses données 
en même temps plutôt que de devoir chercher sur la page cart.js la bonne id du produit correspondant, puis 
à ce moment là d'itérer sur les différents produits pour rajouter à chaque objet les différentes clés
correspondantes etc */

let imagePath = "";
let imageAltTxt = "";

/* Je Fetch l'api en indiquant l'id du produit à fetch,
j'insère ensuite dans les variables créer juste au dessus (variables reliant vers les bonnes id dans le html)
les données récupérer de l'api.
Pour les couleurs, comme c'est un menu déroulant avec un nombre d'éléments variables, j'utilise
une boucle pour insérer chaque couleur récupérer dans l'api
*/

fetch('http://localhost:3000/api/products/' + idProduct)
  .then(res => res.json())
  .then(data => {
    image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    title.innerText = `${data.name}`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;
    imagePath = data.imageUrl ;
    imageAltTxt = data.altTxt ;

    for (let color of data.colors) {
      colors.innerHTML += `<option value=
                          "${color}">${color}
                          </option>`;
    }

  })
  .catch(_error => {
    alert('Error');
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
  clientCart.alt = document.getElementById('description').textContent;
  //clientCart.image = document.querySelector("article div.item__img").textContent;
  clientCart.path = imagePath;
  clientCart.altTxt = imageAltTxt;
  console.log(clientCart)
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

  /* Si le panier est vide, chosenProduct renvoie null, donc pour "if (chosenProduct)"
  * chosenProduct renvoie false à la condition du if ligne 132. Cela continue donc à la 
  * condition else ligne 146, qui va insérer un tableau à chosenProduct puis appliquer la
  * fonction pushLocalStorage() */

  //-------------------------------------ACTUALISATION DE LA QUANTITE--------------------------------------//

  /* Explication : Si chosenProduct (donc ce qui est récupérer dans le localStorage) contient quelque chose, 
  alors on utilise une boucle for of pour itérer sur ces paires clés/valeurs.
  On souhaite cette itération uniquement si l'id et la color de cet objet thatProduct sont déjà présents 
  dans le panier clientCart du client.
  Si les conditions sont remplis, on créer une nouvelle variable, qui sera le résultat de l'addition 
  entre les deux commandes
  On convertis le résultat de cette opération dans une chaine JSON, qui viendra donc remplacer la valeur
  présente avant la boucle
  et on retourne enfin dans le LS ce produit avec les quantitées modifiées
  */
  if (chosenProduct) {
    for (let thatProduct of chosenProduct) {
      if (thatProduct._id === clientCart._id && thatProduct.colors === clientCart.colors) {
        let addition = +thatProduct.quantity + +clientCart.quantity;
        thatProduct.quantity = JSON.stringify(addition);
        alert("Quantité de votre produit mise à jour !");
        return(localStorage.produit = JSON.stringify(chosenProduct));
      }
    }
    pushLocalStorage()
    alert("Produit ajouté au panier!");
  }

  // Si il n'y a pas de produit dans le LS
  else {
    chosenProduct = [];
    pushLocalStorage();
    alert("Félicitation, vous avez ajouter votre premier article à votre panier!");
  }
})
