const url = 'http://localhost:3000/api/teddies/';

const template = document.getElementById('template-product');

/* --- cherche l'id du produit dans l'url --- */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');
console.log(productId);

/* --- faire une requête à partir de l'id --- */
function makeRequest() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url + productId);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            let products = JSON.parse(httpRequest.responseText);            
            displayProducts(products);
        }
    }
}

/* --- afficher le produit --- */
function displayProducts(products) {
    console.log(products.colors[0]);

    let clone = template.content.cloneNode(true);
    let img = clone.getElementById('img');
    img.setAttribute('src', products.imageUrl);
    let name = clone.getElementById('name');
    let description = clone.getElementById('description');
    let colors = clone.getElementById('colors');
    let price = clone.getElementById('price');

    name.innerHTML = products.name;
    description.innerHTML = products.description;
    for (i = 0; i < products.colors.length; i++) { 
        console.log(products.colors.length);
        let color = document.createElement("option");
        color.setAttribute("value", "color");
        color.innerHTML = products.colors[i]; 
        colors.appendChild(color);
	}    
    price.innerHTML += products.price / 100;

    /* --- ajouter au stockage local --- */
    let addButton = clone.getElementById('bag-btn');
    // l'ajout se produira au click sur le bouton ADD
    addButton.addEventListener('click', function() {
        // ajoute une key au stockage local pour le panier
         const cart = localStorage.getItem('cart');
         console.log(products);
         if (cart) {
             // transforme les données en tableau
             inCart = JSON.parse(cart);
             //ajoute le produit au panier
             
             inCart.push(products);
             // transforme les données en JSON pour les stocker dans le stockage local
             localStorage.setItem('cart', JSON.stringify(inCart));
         } else {
             // contenu déclaré comme un tableau
             inCart = [];
             //ajoute le produit au panier
             inCart.push(products);
             // transforme les données en JSON pour les stocker dans le stockage local
             localStorage.setItem('cart', JSON.stringify(inCart));
         }
         event.target.disabled = true;
     
         /* --- afficher le nombre de produits dans le panier au click--- */
         // récupère le nombre de produits dans la key du panier
         const quantityInCart = JSON.parse(localStorage.getItem('cart')).length;
         // affiche le nombre à côté du logo du panier
         document.querySelector('.cart-items').innerHTML = `${quantityInCart}`;
     }); 
     template.parentNode.appendChild(clone);
}

makeRequest(url + productId);

/* --- afficher le nombre de produits dans le panier après chargement de la page --- */
window.addEventListener("load", function(event) {
    console.log(event);
    // récupère le nombre de produits dans la key du panier
    const quantityInCart = JSON.parse(localStorage.getItem('cart')).length;
    // affiche le nombre à côté du logo du panier
    document.querySelector('.cart-items').innerHTML = `${quantityInCart}`;
});


