const params = new URLSearchParams(window.location.search);
const prodID = params.get("prodID");
console.log("PRODUCT ID: ", prodID);
const URL = prodID
  ? "https://striveschool-api.herokuapp.com/api/product/" + prodID
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = prodID ? "PUT" : "POST";

document
  .getElementById("newProductForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let productName = document.getElementById("productName").value;
    let productDescription =
      document.getElementById("productDescription").value;
    let productPrice = document.getElementById("productPrice").value;
    let productBrand = document.getElementById("productBrand").value;
    let productImage = document.getElementById("productImage").value;

    let product = {
      name: productName,
      description: productDescription,
      price: productPrice,
      brand: productBrand,
      imageUrl: productImage,
    };
    fetch(URL, {
      method: method,
      body: JSON.stringify(product),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjA2NTI1NGU4ODAwMTgzZjE4YTYiLCJpYXQiOjE2OTk2MDY2MjksImV4cCI6MTcwMDgxNjIyOX0.C-QAEUjlPLEdIlZVChaz8ZMPITXV1Bs4Df3cg5DWrwM",
        "Content-Type": "application/json",
      },
    });
  });

if (prodID) {
  document.getElementById("headerTitle").innerText = "Modify Product";
  document.getElementById("firstButton").innerText = "Apply Modify";
  document.getElementById("erase").classList.remove("visually-hidden");

  fetch(URL, {
    method: method,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjA2NTI1NGU4ODAwMTgzZjE4YTYiLCJpYXQiOjE2OTk2MDY2MjksImV4cCI6MTcwMDgxNjIyOX0.C-QAEUjlPLEdIlZVChaz8ZMPITXV1Bs4Df3cg5DWrwM",
    },
  })
    .then(response => response.json())
    .then(data => {
      const { name, description, brand, price, imageUrl } = data;
      document.getElementById("productName").value = name;
      document.getElementById("productDescription").value = description;
      document.getElementById("productPrice").value = price;
      document.getElementById("productBrand").value = brand;
      document.getElementById("productImage").value = imageUrl;
    });
}

function confirm_reset() {
  return confirm("Sei sicuro di voler formattare il form?");
}

document.getElementById("erase").addEventListener("click", function () {
  if (confirm("Sei sicuro ?")) {
    alert("Prodotto eliminato correttamente!");

    if (prodID) {
      fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjA2NTI1NGU4ODAwMTgzZjE4YTYiLCJpYXQiOjE2OTk2MDY2MjksImV4cCI6MTcwMDgxNjIyOX0.C-QAEUjlPLEdIlZVChaz8ZMPITXV1Bs4Df3cg5DWrwM",
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("Card eliminata con successo:", data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  } else {
    alert("Eliminazione annullata!");
  }
});
