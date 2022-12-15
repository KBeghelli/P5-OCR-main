// Récupération des produits dans le LS
let productInLocalStorage = JSON.parse(localStorage.getItem('produit'));
console.table(productInLocalStorage)

/*fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        console.log("importation de l'api réussi")
    })
    .catch((err) => {
        console.log(err);
    });
*/
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
                <img src="${productInLocalStorage[i].path}" alt="${productInLocalStorage[i].altTxt}">
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

// Calcul du prix du panier //

/* Deux Variables vides : howManyProduct va récupérer les quantités de chaque produit présent dans le LS,
et eachProductTotalPrice va recevoir la quantité multiplié par le prix de chaque produit.

Pour ce qui est de la méthode : Je boucle sur chaque produit contenu dans productInLocalStorage. Pour chaque 
produit, je récupère son prix et sa quantité. Je push la quantité dans le premier tableau, qui servira à
informer l'utilisateur de nombre de produits totaux dans son panier. 
Pour le prix total, je créer la variable productTotal, qui multiple la quantité par le prix. Je push ensuite 
cette valeur dans le tableau.
Je réduis les deux tableaux à une seule valeur en les additionant entre eux via la fonction reduce(), 
Ce sont donc ces deux valeurs là (quantité total et prix total) qui seront affichés dans le HTML
*/


/////////////probablement à refaire : il faut que ce soit sous forme de fonction/////////////////////////

/* Changement de la quantité : Création d'une variable, qui va regrouper tous les champs input itemQuantity
présent dans le HTML. Je boucle sur chaque champs, et met un eventListener de type change pour 


*/
function modifyingQuantity() {
    let quantityToModify = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < quantityToModify.length; k++) {
        quantityToModify[k].addEventListener("change", (event) => {
            let newQuantity = quantityToModify[k].value;
            productInLocalStorage[k].quantity = newQuantity;
            localStorage.setItem('produit', JSON.stringify(productInLocalStorage));
            console.table(productInLocalStorage);
            calculingCart()
            calculingNumberOfProduct()
        })
    }
}

modifyingQuantity()


function calculingCart() {
    let eachProductTotalPrice = [];

    for (let j = 0; j < productInLocalStorage.length; j++) {
        let productTotal = productInLocalStorage[j].price * productInLocalStorage[j].quantity;
        eachProductTotalPrice.push(productTotal);
        total = eachProductTotalPrice.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    const totalPrice = document.getElementById('totalPrice');
    totalPrice.textContent = total;
}
calculingCart()


function calculingNumberOfProduct() {
    let howManyProduct = [];

    for (let j = 0; j < productInLocalStorage.length; j++) {
        const productQuantityInLS = productInLocalStorage[j].quantity;
        let productQuantityValue = parseInt(productQuantityInLS);
        howManyProduct.push(productQuantityValue);
        totalQ = howManyProduct.reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    const totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalQ
}
calculingNumberOfProduct()


/* Fonction suppression d'un canapé dans le panier
Je cible tous les éléments possédant l'attribut "deleteItem" avec une boucle, et ajoute un eventlistener
sur le click. 
*/

function deleteProduct() {
    let deleteThatProduct = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < deleteThatProduct.length; j++) {
        deleteThatProduct[j].addEventListener("click", (event) => {

            let idDelete = productInLocalStorage[j]._id;
            let colorDelete = productInLocalStorage[j].colors;

            productInLocalStorage = productInLocalStorage.filter(el =>
                el._id !== idDelete || el.colors !== colorDelete);

            localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
            deleteThatProduct[j].closest("article").remove();
            calculingCart()
            calculingNumberOfProduct()
        }
        )
    }
}
deleteProduct();

/* FORMULAIRE */

const contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value
}

function firstNameValide() {
    const regExpOnlyLetter = /^[A-Za-z]+$/;
    let firstName = document.getElementById('firstName').value;
    if (!regExpOnlyLetter.test(firstName)) {
        alert('Prénom non valide !');
        return false
    } else {
        return true;
    }
}

function lastNameValide() {
    const regExpOnlyLetter = /^[A-Za-z]+$/;
    let lastName = document.getElementById('lastName').value;
    if (!regExpOnlyLetter.test(lastName)) {
        alert('Nom non valide !');
        return false
    } else {
        return true;
    }
}

function adressValide() {
    const regExAdress = /^[0-9a-zA-Z]+$/;
    let address = document.getElementById('address').value;
    if (!regExAdress.test(address)) {
        alert('Adresse non valide !');
        return false
    } else {
        return true;
    }
}

function cityValide() {
    const regExpOnlyLetter = /^[A-Za-z]+$/;
    let city = document.getElementById('city').value;
    if (!regExpOnlyLetter.test(city)) {
        alert('Ville non valide !');
        return false
    } else {
        return true;
    }
}

function emailValide() {
    const regExMail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    let email = document.getElementById('email').value;
    if (!regExMail.test(email)) {
        alert('Email non valide !');
        return false
    } else {
        return true;
    }
}

