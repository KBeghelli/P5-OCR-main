
let params = (new URL(document.location)).searchParams;
let idProduct = params.get("id");

const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
//const image = document.querySelector("article div.item__img");
const image = document.getElementByClass('item__img');

fetch('http://localhost:3000/api/products/' + idProduct)
  .then(res => res.json())
  .then(data => {

    /*let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = data.imageUrl;
    productImg.alt = data.altTxt;*/
    image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

    title.innerText = `${data.name}`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    for (let color of data.colors) {
      let productColors = document.createElement("test");
      document.querySelector("#colors").appendChild(productColors);
    }

  })
  .catch(_error => {
    alert('BUG');
  });
