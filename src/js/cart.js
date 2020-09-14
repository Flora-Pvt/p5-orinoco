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
      /*function postData(response) {
        // nouvelle requête Http        
        let request = new XMLHttpRequest();
        // méthode POST pour envoyer les données au serveur
        //request.open("POST", 'http://localhost:3000/api/teddies/order');
        // indique le type de données à envoyer
        request.setRequestHeader("content-type", "application/json");
        // envoie les données au format JSON
        request.send(JSON.stringify(data));
        console.log(JSON.stringify(data));        
        console.log(this.orderId);
        //let loadingNewPage = (function() {
        //document.location.href="order.html";              
      //});      
      //setTimeout(loadingNewPage, 4000);  */  
      function post() { // Fonction pour envoyer les données au back en asynchrone
        return new Promise((resolve, reject) => { // La fonction renvoie une promesse pour éviter les callback
            let request = new XMLHttpRequest(); // On crée un nouvel objet XMLHttpRequest
            request.open("POST", 'http://localhost:3000/api/teddies/order'); // On initialise la requête en précisant le type et l'url cible
            request.setRequestHeader("content-type", "application/json"); // On précise ce que l'on envoi
            request.send(JSON.stringify(data)); // On envoie la requête que l'on stringify
            request.onreadystatechange = function() { // A chaque changement d'état de la propriété onreadystatechange
                if (this.readyState === 4) { // Si l'état vaut 4 (=DONE) la requête est terminée
                    if (this.status === 201) { // On check aussi le status: si il est = 201 -> la requête est un succès et une ressource a été crée
                        resolve(JSON.parse(this.responseText)); // On resolve donc la promesse en récupérant la réponse, notamment l'id de commande
                    } else {
                        reject(request); // Sinon on la rejette et on passe en argument la requête pour éventuellement récupérer les codes erreurs
                    }
                }
            }
        })
    }
      post("http://localhost:3000/api/teddies/order", data) // On envoi data au back
		.then(function(response){ // Si tout s'est bien passé on récupère la réponse du serveur
      let orderId = response.orderId; // On récupère l'id de commande présent dans la réponse
      console.log(orderId);		
      localStorage.setItem("orderId", orderId); // On stock dans le localStorage notre id de commande
    	
		})
		.catch(function(error){ // S'il y a eu une erreur
			alert('error');
			});
      }
      //postData();
    //}
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

