let urlProductsData = 'http://localhost:3000/api/products/';

let idToPutProductsData = document.getElementById('items');

dynamicProducts();

function dynamicProducts() {
  fetch(urlProductsData).then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
    .then((data) => {
      data.forEach(product => {
        let insertHtml = document.createElement("a");
        insertHtml.setAttribute("href", `./product.html?id=${product._id}`)
        insertHtml.innerHTML = `<article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
      </article>`

        idToPutProductsData.appendChild(insertHtml);
      })
    })
    .catch((err) => {
      console.error(err);
    });
}

// J'aurais de nouveau besoin de l'API pour d'autres pages, donc j'exporte cette variable
// export default urlProductsData;