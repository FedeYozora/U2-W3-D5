const cardContainer = document.getElementById("row");
let URL = "https://striveschool-api.herokuapp.com/api/product/";

loadProduct();

function loadProduct() {
  document.getElementById("row").innerHTML = "";
  fetch(URL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjA2NTI1NGU4ODAwMTgzZjE4YTYiLCJpYXQiOjE2OTk2MDY2MjksImV4cCI6MTcwMDgxNjIyOX0.C-QAEUjlPLEdIlZVChaz8ZMPITXV1Bs4Df3cg5DWrwM",
    },
  })
    .then(response => response.json())
    .then(data => {
      function createCard(product) {
        const card = document.createElement("div");
        card.className = "col-md-3";

        const cardBody = document.createElement("div");
        cardBody.className = "card mb-4 shadow-sm";

        const cardImg = document.createElement("img");
        cardImg.className = "card-img-top object-fit-cover";
        cardImg.src = product.imageUrl;
        cardImg.style.scale = "0.9";
        cardImg.alt = product.name;

        const cardText = document.createElement("div");
        cardText.className = "card-body";
        // cardText.style.height = "250px";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = product.name;

        const cardDescription = document.createElement("p");
        cardDescription.className = "card-text";
        cardDescription.textContent = product.description;

        const cardPrice = document.createElement("p");
        cardPrice.className = "card-text";
        cardPrice.textContent = `$${product.price}`;

        const cardButtonView = document.createElement("a");
        cardButtonView.href = `./details.html?prodID=${product._id}`;
        cardButtonView.className = "btn btn-primary";
        cardButtonView.textContent = "Scopri di più";

        const cardButtonModify = document.createElement("a");
        cardButtonModify.href = `./backoffice.html?prodID=${product._id}`;
        cardButtonModify.className = "btn btn-success";
        cardButtonModify.textContent = "Modifica Prodotto";

        cardText.appendChild(cardTitle);
        cardText.appendChild(cardDescription);
        cardText.appendChild(cardPrice);

        cardBody.appendChild(cardImg);
        cardBody.appendChild(cardText);
        cardText.appendChild(cardButtonView);
        cardText.appendChild(cardButtonModify);
        card.appendChild(cardBody);

        return card;
      }

      data.forEach(product => {
        const card = createCard(product);
        cardContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.log(error);
    });
}
