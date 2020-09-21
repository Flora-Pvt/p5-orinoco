// déclare les variables 
const clearCartBtn = document.querySelector('.clear-cart');
const cartTotal = document.querySelector('.cart-total');
const orderBtn = document.getElementById('order-btn');
let inputOrder = document.getElementsByTagName("input");
let formOrder = document.getElementById("form");

/* --- affiche le panier et ses fonctionnalités --- */
function displayCart() {
  if (inCart == null || inCart.length == 0) {
    document.getElementById("no-product").innerHTML = "Vous n'avez pas d'ourson dans le panier.";
    orderBtn.disabled = true;
  } else {
    for (i = 0; i < inCart.length; i++) {
      // détermine où afficher les informations des produits dans le HTML
      let clone = template.content.cloneNode(true);
      let img = clone.getElementById('img');
      img.setAttribute('src', inCart[i].imageUrl);
      img.setAttribute('alt', "ours en peluche " + inCart[i].name);
      let name = clone.getElementById('name');
      let productTotal = clone.getElementById('product-total');
      let reference = clone.getElementById('reference');
      let quantity = clone.getElementById('quantity');
      let price = clone.getElementById('price');
      let removeBtn = clone.getElementById('remove');
      let addBtn = clone.getElementById('add');
      let clearBtn = clone.getElementById('clear');
      // injecte les informations des produits dans le HTML
      clearBtn.dataset.id = inCart[i]._id;
      name.innerHTML = inCart[i].name;
      price.innerHTML = inCart[i].price / 100 + " €";
      reference.innerHTML += inCart[i]._id;
      quantity.innerHTML = inCart[i].number;
      productTotal.innerHTML += (inCart[i].number * inCart[i].price) / 100 + " €";
      template.parentNode.appendChild(clone);

      /* --- ajoute une quantité ---*/
      addBtn.addEventListener("click", () => {
        let id = clearBtn.dataset.id;
        let ourProduct = inCart.filter(p => p._id == id);
        ourProduct[0].number++;
        changeQuantity(id, ourProduct, quantity);

        // affiche le nouveau total du panier
        productTotal.innerHTML = (ourProduct[0].number * ourProduct[0].price) / 100 + " €";
        displayTotal();

        // affiche le nouveau nombre de produits dans le panier
        displayCartNumber();
      });

      /* --- enlève une quantité ---*/
      removeBtn.addEventListener("click", () => {
        let id = clearBtn.dataset.id;
        let ourProduct = inCart.filter(p => p._id == id);
        if (ourProduct[0].number > 1) {
          ourProduct[0].number--;
          changeQuantity(id, ourProduct, quantity);
          // affiche le nouveau total du panier
          productTotal.innerHTML = (ourProduct[0].number * ourProduct[0].price) / 100 + " €";
          displayTotal();
          // affiche le nouveau nombre de produits dans le panier
          displayCartNumber();
        }
      });

      /* --- supprime un produit ---*/
      clearBtn.addEventListener("click", () => {
        let id = clearBtn.dataset.id;
        let newCart = inCart.filter(p => p._id != id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        location.reload();
      })
    }
  }
  /* --- affiche le total du panier ---*/
  displayTotal();

  /* --- envoie les id du panier et infos du formulaire au serveur au clic sur "Terminer l'achat" --- */
  orderBtn.addEventListener('click', () => {
    //ajoute les id des produits du panier au tableau products
    let products = [];
    for (i = 0; i < inCart.length; i++) {
      products.push(inCart[i]._id);
    }
    //empêche d'ouvrir la page commande au clic
    formOrder.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    // si le formulaire est validé crée l'objet contact
    if (formOrder.checkValidity()) {
      let contact = {
        firstName: inputOrder[1].value,
        lastName: inputOrder[2].value,
        address: inputOrder[3].value,
        city: inputOrder[5].value,
        email: inputOrder[0].value
      };
      // déclare data comme combinaison de l'objet contact et du tableau products
      let data = { contact, products };
      // envoie les données au serveur
      function post() {
        return new Promise((resolve, reject) => {
          let request = new XMLHttpRequest();
          request.open("POST", 'http://localhost:3000/api/teddies/order');
          request.setRequestHeader("content-type", "application/json");
          request.send(JSON.stringify(data));
          request.onreadystatechange = function () {
            if (this.readyState === 4) {
              if (this.status === 201) {
                resolve(JSON.parse(this.responseText));
              } else {
                reject(request);
              }
            }
          }
        });
      }
      post("http://localhost:3000/api/teddies/order", data)
        .then(function (response) {
          let orderId = response.orderId;
          localStorage.setItem("orderId", orderId);
          window.location.href = "commande.html"
        })
        .catch(function () {
          alert("Une erreur est survenue.");
        });
    }
  });
}

displayCart();

/* --- afficher le nombre de produits dans le panier après chargement de la page --- */
displayCartNumber();

/* --- affiche les aides pour le formulaire --- */
formOrder.addEventListener('submit', function (event) {
  if (formOrder.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  formOrder.classList.add('was-validated');
}, false);