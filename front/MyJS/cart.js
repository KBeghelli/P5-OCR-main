// Récupération des produits dans le LS
let productInLocalStorage = JSON.parse(localStorage.getItem('produit'));
console.table(productInLocalStorage)

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        console.log("importation de l'api réussi")
    })
    .catch((err) => {
        console.log(err);
    });

//AFFICHAGE

const cartItems = document.getElementById('cart__items');
console.log(productInLocalStorage)
let fillingCartHtml = []
for (i = 0; i < productInLocalStorage.length; i++) {
    fillingCartHtml = fillingCartHtml + `
        <article class="cart__item" 
                data-id="${productInLocalStorage[i]._id}" 
                data-color="${productInLocalStorage[i].colors}">
            <div class="cart__item__img">
                <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${productInLocalStorage[i].name}</h2>
                    <p>${productInLocalStorage[i].colors}</p>
                    <p>${productInLocalStorage[i].price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" 
                                            name="itemQuantity" 
                                            min="1" 
                                            max="100" 
                                            value="${productInLocalStorage[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
`
}

if (i === productInLocalStorage.length) {
    cartItems.innerHTML = fillingCartHtml;
}

