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

Je cible tous les éléments possédant l'attribut "deleteItem", et boucle sur l'élément cliqué par l'utilisateur.
Je créer des variables et récupère dans celle-ci l'id et la color de ce produit en particulier.
J'utilise ensuite la fonction filter() pour me renvoyer le tableau productInLocalStorage sans
l'élément possédant l'id et la color indiqué
Je réegengistre dans le local storage le panier de l'utilisateur sans l'élément

Je supprime dynamiquement le HTML en ciblant d'abord avec closest() la balise "article" la plus proche 
de l'élément ciblé, puis j'utilise remove() pour supprimer tout ce qui se trouve dans cette partie du HTML

Je réutilise ensuite mes fonctions calculingCart() et calculingNumberOfProduct() pour recalculer le
nombre de produit et le prix total du panier
*/

function deleteProduct() {
    let deleteThatProduct = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < deleteThatProduct.length; j++) {
        deleteThatProduct[j].addEventListener("click", (event) => {

            let idDelete = productInLocalStorage[j]._id;
            let colorDelete = productInLocalStorage[j].colors;

            productInLocalStorage = productInLocalStorage.filter(el =>
                el._id !== idDelete || el.colors !== colorDelete
            );

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

let orderId = "";
/* Création de 3 fonctions "RegExp", pour vérifier si les données indiquer par l'utilisateur sont valides. */

function checkingLetter(value) {
    return /^[A-Z-a-z\s]{3,25}$/.test(value)
}

function checkingAdress(value) {
    return /^[0-9]{1,5}[a-z-A-Z\s]{2,8}[a-z-A-Z -.,]{3,40}$/.test(value)
}

function chekingEmail(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
}

/* Créations de 5 variables contenant le chemin vers les différentes informations personnelles de 
l'utilisateur, nécessaire pour le contacter / passer une commande.
J'utilise ensuite des Event Listener de type change sur chacun des formulaires. Je vérifie les données
remplis par l'utilisateur au "RegExp" créer juste avant, si les données sont invalides (un chiffre dans
le prénom par exemple), j'affiche un message d'erreur.
*/
const formFirstName = document.getElementById("firstName");
const formLastName = document.getElementById("lastName");
const formAdress = document.getElementById("address");
const formCity = document.getElementById("city");
const formEmail = document.getElementById("email");

formFirstName.addEventListener("change", (e) => {
    if (checkingLetter(formFirstName.value)) {
        firstNameErrorMsg.textContent = "";
    } else {
        firstNameErrorMsg.textContent = `Doit Contenir entre 3 et 25 caractères`;
        e.preventDefault()
    }
});

formLastName.addEventListener("change", (e) => {
    if (checkingLetter(formLastName.value)) {
        lastNameErrorMsg.textContent = "";
    } else {
        lastNameErrorMsg.textContent = `Doit Contenir entre 3 et 25 caractères`;
        e.preventDefault()
    }
});

formAdress.addEventListener("change", (e) => {
    if (checkingAdress(formAdress.value)) {
        addressErrorMsg.textContent = "";
    } else {
        addressErrorMsg.textContent = `Doit Contenir entre 3 et 25 caractères`;
        e.preventDefault()
    }
});

formCity.addEventListener("change", (e) => {
    if (checkingLetter(formCity.value)) {
        cityErrorMsg.textContent = "";
    } else {
        cityErrorMsg.textContent = `Doit Contenir entre 3 et 25 caractères`;
        e.preventDefault()
    }
});

formEmail.addEventListener("change", (e) => {
    if (chekingEmail(formEmail.value)) {
        emailErrorMsg.textContent = "";
    } else {
        emailErrorMsg.textContent = `Doit Contenir entre 3 et 25 caractères`;
        e.preventDefault()
    }
});

/* Je créer une variable ciblant le bouton commander, et je EventListener le click. 
Si les RegEx renvoie true sur la valeur des différents formulaires, alors on continu
On récupère les produits ajouté au panier présent dans le localstorage

*/
const sendingOrder = document.getElementById("order")

sendingOrder.addEventListener("click", (e) => {
    e.preventDefault();

    const contact = {
        firstName: formFirstName.value,
        lastName: formLastName.value,
        address: formAdress.value,
        city: formCity.value,
        email: formEmail.value
    }

    if (checkingLetter(formFirstName.value) &&
        checkingLetter(formLastName.value) &&
        checkingAdress(formAdress.value) &&
        checkingLetter(formCity.value) &&
        chekingEmail(formEmail.value)) {

        localStorage.setItem("contact", JSON.stringify(contact));
    } else {
        alert("Le formulaire n'est pas bien remplis !")
    }


    let products = [];
    for (let i = 0; i < productInLocalStorage.length; i++) {
        products.push(productInLocalStorage[i]._id);
    }
    
    console.log("products")
    console.log(products)
    console.log("contact")
    console.log(contact)

    const finalCommand = {
        contact,
        products,
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(finalCommand),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('orderId', data.orderId);
            document.location.href = 'confirmation.html?id='+ data.orderId;
        });
})
