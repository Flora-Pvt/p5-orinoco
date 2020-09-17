const url = 'http://localhost:3000/api/teddies/';

const template = document.getElementById('template-product');

/* --- cherche l'id du produit dans l'url --- */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

let addButton = document.getElementById('bag-btn');
let feedback = document.getElementById('feedback');

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
        let color = document.createElement("option");
        color.setAttribute("value", "color");
        color.innerHTML = products.colors[i];
        colors.appendChild(color);
    }
    price.innerHTML += products.price / 100;

    /* --- ajouter au stockage local --- */

    // l'ajout se produira au clic sur le bouton ADD
    addButton.addEventListener('click', function () {
        let quantity = document.getElementById('quantity');

        // ajoute une key au stockage local pour le panier
        const cart = localStorage.getItem('cart');
        if (cart && colors.validity.valid === true) {
            inCart = JSON.parse(cart);
            let isPresent = inCart.some(p => p._id == productId);
            console.log(isPresent);
            if (isPresent) {
                console.log("ajoute une quantité");
                let ourProduct = inCart.filter(p => p._id == productId);
                ourProduct[0].number++;
                let newCart = inCart.filter(p => p._id != productId);
                newCart.push(ourProduct[0]);
                localStorage.setItem("cart", JSON.stringify(newCart));
                quantity.innerHTML = ourProduct[0].number;
                feedback.innerHTML = "produit ajouté au panier";
            } else {
                // transforme les données en tableau javascript
                console.log("ajoute le produit une première fois");
                //inCart = JSON.parse(cart);
                products.number = 1;
                //ajoute le produit au panier            
                inCart.push(products);
                // transforme les données en JSON pour les stocker dans le stockage local
                localStorage.setItem('cart', JSON.stringify(inCart));
                quantity.innerHTML = products.number;
                feedback.innerHTML = "produit ajouté au panier";
            }
        } else if (colors.validity.valid === false) {
            feedback.innerHTML = "Veuillez choisir une couleur";
        } else {
            console.log("tout premier ajout");
            // contenu déclaré comme un tableau
            inCart = [];
            products.number = 1;
            //ajoute le produit au panier
            inCart.push(products);
            // transforme les données en JSON pour les stocker dans le stockage local
            localStorage.setItem('cart', JSON.stringify(inCart));

            quantity.innerHTML = products.number;
            feedback.innerHTML = "produit ajouté au panier";
        }
        //event.target.disabled = true;

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
window.addEventListener("load", function () {
    let inCart = JSON.parse(localStorage.getItem('cart'));  
    let quantityInCart = 0;
    for (i = 0; i < inCart.length; i++) {        
        quantityInCart += inCart[i].number;        
    }
    document.querySelector('.cart-items').innerHTML = quantityInCart;
});

