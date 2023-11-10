const params = new URLSearchParams(window.location.search);
const prodID = params.get("prodID");
console.log("PRODUCT ID: ", prodID);

window.onload = () => {
  const container = document.getElementById("product-details");

  fetch("https://striveschool-api.herokuapp.com/api/product/" + prodID, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjA2NTI1NGU4ODAwMTgzZjE4YTYiLCJpYXQiOjE2OTk2MDY2MjksImV4cCI6MTcwMDgxNjIyOX0.C-QAEUjlPLEdIlZVChaz8ZMPITXV1Bs4Df3cg5DWrwM",
    },
  })
    .then(resp => resp.json())
    .then(productObj => {
      container.innerHTML = `
                    <h2>${productObj.name}</h2>
                    <img class="card-img-top object-fit-cover my-4" src="${productObj.imageUrl}" style="width: 400px;">
                    <h5>${productObj.description}</h5>
                    <h5>${productObj.price}€</h5>
                    <h6>Informazioni dal Server:</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>_id:</strong> ${productObj._id}</li>
                    </ul>
                    <button class="btn btn-info mt-4" onclick="handleClick()">Modifica Prodotto</button>
                `;
    });
};

const handleClick = () => {
  window.location.assign("./backoffice.html?prodID=" + prodID);
};
