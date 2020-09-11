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
  // pour chaque produit dans le panier affiche son image, son nom et son prix dans le tableau
  for (i = 0; i < productsInCart.length; i++) {
    //console.log(productsInCart[i].name);
    let clone = template.content.cloneNode(true);
    let img = clone.getElementById('img');
    img.setAttribute('src', productsInCart[i].imageUrl);
    let name = clone.getElementById('name');
    let price = clone.getElementById('price');
    name.innerHTML = productsInCart[i].name;
    price.innerHTML += productsInCart[i].price / 100;
    template.parentNode.appendChild(clone);
  }


  /* --- afficher le total du panier ---*/

  // déclare le total
  let total = 0;
  // pour chaque produit dans le panier...
  for (i = 0; i < productsInCart.length; i++) {
    // ...ajoute le prix au total déclaré
    total = total + parseInt(productsInCart[i].price);
  }
  // affiche le total dans le html
  cartTotal.innerHTML = total / 100;


  /* --- envoie les id du panier et infos du formulaire au serveur au click sur Terminer l'achat--- */

  orderBtn.addEventListener('click', () => {
    // produits déclaré comme un tableau
    let products = [];
    //ajoute les id des produits du panier au tableau products
    for (i = 0; i < productsInCart.length; i++) {
      //idObject = {
      //  _id: productsInCart[i]._id
      //}
      products.push(productsInCart[i]._id);
    }

    //empêche d'ouvrir la page commande au click sur Terminer l'achat
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

      // crée la fonction pour envoyer les données au serveur /order
      function postData() {
        // nouvelle requête Http        
        let request = new XMLHttpRequest();
        // méthode POST pour envoyer les données au serveur
        request.open("POST", 'http://localhost:3000/api/teddies/order');
        // indique le type de données à envoyer
        request.setRequestHeader("content-type", "application/json");
        // envoie les données au format JSON
        request.send(JSON.stringify(data));
        console.log(JSON.stringify(data));
        let loadingNewPage = (function() {
        document.location.href="order.html";              
      });      
      setTimeout(loadingNewPage, 4000);    
      }
      postData();
    }
  });
}

displayCart();

/* --- bouton pour supprimer tous les produits du panier --- */
clearCartBtn.addEventListener("click", () => {
  localStorage.clear('cart');
  location.reload();
});

/* --- afficher le nombre de produits dans le panier après chargement de la page --- */
window.addEventListener("load", function () {
  // récupère le nombre de produits dans la key du panier
  const quantityInCart = JSON.parse(localStorage.getItem('cart')).length;
  // affiche le nombre à côté du logo du panier    
  document.querySelector('.cart-items').innerHTML = `${quantityInCart}`;
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

