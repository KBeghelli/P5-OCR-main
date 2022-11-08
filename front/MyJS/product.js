/*const test = document.getElementById('title');
test.textContent = "Ceci est un test";*/


let params = (new URL(document.location)).searchParams;
let idProduct = params.get("id");

const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const image = document.getElementsByClassName('item__img');

fetch("http://localhost:3000/api/products/" + idProduct)
  .then(res => res.json())
  .then(data => {
    title.innerHTML = `${data.name}`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;
 
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })
  .catch(_error => {
    alert('BUG');
  });
