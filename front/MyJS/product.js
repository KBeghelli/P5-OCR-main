
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

let chosenProduct = {};
chosenProduct._id = idProduct;
chosenProduct.price = document.getElementById('price');

// Couleur

let productColor = document.getElementById('colors');
productColor.addEventListener("change", (test) => {
  let exempleColor = test.target.value;
  chosenProduct.colors = exempleColor;
});

// Quantité

let productQuantity = document.getElementById('quantity');
productQuantity.addEventListener("input", (essai) => {
  let exempleQuantity = essai.target.value;
  chosenProduct.quantity = exempleQuantity;
  console.log(chosenProduct);
});

/* chosenProduct est désormais un array contenant l'id du produit, et la couleur/quantité sélectionné
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
  if (
    chosenProduct.quantity < 1 ||
    chosenProduct.quantity > 100 ||
    chosenProduct.quantity === undefined ||
    chosenProduct.colors === undefined
  ) {
    alert("Quelque chose s'est mal passé ! Veuillez indiquer la couleur et la quantité désiré !")
  } else {
    pushLocalStorage();
    alert("Produit ajouté !")
  }
})

function pushLocalStorage(){
  window.localStorage.setItem('productAddedToStorage', JSON.stringify(chosenProduct));
}


/*let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

const addProductLocalStorage = () => {
  productInLocalStorage.push(chosenProduct);
  localStorage.setItem('product', JSON.stringify(productInLocalStorage));
}*/

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));