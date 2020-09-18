// déclare les variables 
const clearCartBtn = document.querySelector('.clear-cart');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const orderBtn = document.getElementById('order-btn');
let inputOrder = document.getElementsByTagName("input");
let formOrder = document.getElementById("form");

const template = document.getElementById('template-product');


/* --- fonction pour charger la carte et ses fonctionnalités --- */

function displayCart() {
  // initialise le panier dans le stockage local
  let productsInCart = JSON.parse(localStorage.getItem('cart'));
  console.log(productsInCart == null);
  // pour chaque produit dans le panier affiche son image, son nom et son prix dans le tableau
  if (productsInCart == null || productsInCart.length == 0) {
    document.getElementById("no-product").innerHTML = "Vous n'avez pas d'ourson dans le panier.";
    orderBtn.disabled = true;
  } else {
    for (i = 0; i < productsInCart.length; i++) {
      let clone = template.content.cloneNode(true);
      let img = clone.getElementById('img');
      img.setAttribute('src', productsInCart[i].imageUrl);
      img.setAttribute('alt', "ours en peluche " + productsInCart[i].name);
      let name = clone.getElementById('name');
      let productPrice = clone.getElementById('product-price');
      let reference = clone.getElementById('reference');
      let quantity = clone.getElementById('quantity');
      let price = clone.getElementById('price');
      let removeBtn = clone.getElementById('remove');
      let addBtn = clone.getElementById('add');
      let clearBtn = clone.getElementById('clear');

      removeBtn.dataset.id = productsInCart[i]._id;
      name.innerHTML = productsInCart[i].name;
      productPrice.innerHTML = productsInCart[i].price / 100 + " €";
      reference.innerHTML += productsInCart[i]._id;
      quantity.innerHTML = productsInCart[i].number;
      price.innerHTML += (productsInCart[i].number * productsInCart[i].price) / 100 + " €";
      template.parentNode.appendChild(clone);

      removeBtn.addEventListener("click", () => {
        console.log("enlève une quantité");
        let idBtn = removeBtn.dataset.id;
        let ourProduct = productsInCart.filter(p => p._id == idBtn);
        if (ourProduct[0].number > 1) {
          ourProduct[0].number--;
          let newCart = productsInCart.filter(p => p._id != idBtn);
          newCart.push(ourProduct[0]);
          localStorage.setItem("cart", JSON.stringify(newCart));
          quantity.innerHTML = ourProduct[0].number;
          price.innerHTML = (ourProduct[0].number * ourProduct[0].price) / 100 + " €";
          let total = 0;
          // pour chaque produit dans le panier...
          for (i = 0; i < productsInCart.length; i++) {
            // ...ajoute le prix au total déclaré   
            total = total + parseInt(productsInCart[i].number * productsInCart[i].price);
          }
          cartTotal.innerHTML = total / 100;
          localStorage.setItem("total", total);
          let inCart = JSON.parse(localStorage.getItem('cart'));
          let quantityInCart = 0;
          for (i = 0; i < inCart.length; i++) {
            quantityInCart += inCart[i].number;
          }
          document.querySelector('.cart-items').innerHTML = quantityInCart;
        }
      })
      addBtn.addEventListener("click", () => {
        console.log("ajoute une quantité");
        let idBtn = removeBtn.dataset.id;
        let ourProduct = productsInCart.filter(p => p._id == idBtn);
        ourProduct[0].number++;
        let newCart = productsInCart.filter(p => p._id != idBtn);
        newCart.push(ourProduct[0]);
        localStorage.setItem("cart", JSON.stringify(newCart));
        quantity.innerHTML = ourProduct[0].number;
        price.innerHTML = (ourProduct[0].number * ourProduct[0].price) / 100 + " €";
        let total = 0;
        // pour chaque produit dans le panier...
        for (i = 0; i < productsInCart.length; i++) {
          // ...ajoute le prix au total déclaré   
          total = total + parseInt(productsInCart[i].number * productsInCart[i].price);
        }
        cartTotal.innerHTML = total / 100;
        localStorage.setItem("total", total);
        let inCart = JSON.parse(localStorage.getItem('cart'));
        let quantityInCart = 0;
        for (i = 0; i < inCart.length; i++) {
          quantityInCart += inCart[i].number;
        }
        document.querySelector('.cart-items').innerHTML = quantityInCart;
      })
      clearBtn.addEventListener("click", () => {
        console.log("supprime le produit");
        let idBtn = removeBtn.dataset.id;
        let newCart = productsInCart.filter(p => p._id != idBtn);
        localStorage.setItem("cart", JSON.stringify(newCart));
        location.reload();
      })
    }
  }


  /* --- afficher le total du panier ---*/

  // déclare le total
  let total = 0;
  if (productsInCart) {
    // pour chaque produit dans le panier...
    for (i = 0; i < productsInCart.length; i++) {
      // ...ajoute le prix au total déclaré   
      total = total + parseInt(productsInCart[i].number * productsInCart[i].price);
    }
  }
  // affiche le total dans le html
  cartTotal.innerHTML = total / 100;
  localStorage.setItem("total", total);

  /* --- envoie les id du panier et infos du formulaire au serveur au clic sur Terminer l'achat--- */

  orderBtn.addEventListener('click', () => {
    // produits déclaré comme un tableau
    let products = [];
    //ajoute les id des produits du panier au tableau products
    for (i = 0; i < productsInCart.length; i++) {
      products.push(productsInCart[i]._id);
    }

    //empêche d'ouvrir la page commande au clic sur Terminer l'achat
    formOrder.addEventListener("submit", function (e) {
      e.preventDefault();
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

      /* --- crée la fonction pour envoyer les données au serveur /order --- */

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
        })
      }
      post("http://localhost:3000/api/teddies/order", data)
        .then(function (response) {
          let orderId = response.orderId;
          console.log(orderId);
          localStorage.setItem("orderId", orderId);
          window.location.href = "order.html"
        })
        .catch(function () {
          alert('error');
        });
    }
  });
}

displayCart();

/* --- afficher le nombre de produits dans le panier après chargement de la page --- */
window.addEventListener("load", function () {
  let inCart = JSON.parse(localStorage.getItem('cart'));
  let quantityInCart = 0;
  if (inCart) {
    for (i = 0; i < inCart.length; i++) {
      quantityInCart += inCart[i].number;
    }
    document.querySelector('.cart-items').innerHTML = quantityInCart;
  }
});

/* --- affiche les aides pour le formulaire --- */
window.addEventListener('load', function () {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}, false);

