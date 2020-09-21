/* --- adresse pour récupérer les données ---*/
const url = 'http://localhost:3000/api/teddies/';

/* --- détermine où afficher le contenu HTML ---*/
const template = document.getElementById('template-product');

/* --- variable pour récupérer les données stocké dans le panier ---*/
let inCart = JSON.parse(localStorage.getItem('cart'));

/* --- appelle le serveur et récupère les données ---*/
async function makeRequest(url) {
    let request
    try {
        request = await fetch(url);
        let products = await request.json();
        displayProducts(products);
    } catch (error) {
        alert("une erreur s'est produite");
    }
}

/* --- affiche le nombre de produits dans le panier à côté du logo panier ---*/
function displayCartNumber() {
    let inCart = JSON.parse(localStorage.getItem('cart'));
    let quantityInCart = 0;
    if (inCart) {
        for (i = 0; i < inCart.length; i++) {
            quantityInCart += inCart[i].number;
        }
    }
    document.querySelector('.cart-items').innerHTML = quantityInCart;
}

/* --- ajoute un premier produit ---*/
function firstAddProduct(products) {
    products.number = 1;
    inCart.push(products);
    localStorage.setItem('cart', JSON.stringify(inCart));
    quantity.innerHTML = products.number;
    feedback.innerHTML = "produit ajouté au panier";
}

/* --- change la quantité d'un produit ---*/
function changeQuantity(id, ourProduct, quantity) {
    let newCart = inCart.filter(p => p._id != id);
    newCart.push(ourProduct[0]);
    localStorage.setItem("cart", JSON.stringify(newCart));
    quantity.innerHTML = ourProduct[0].number;
}

/* --- affiche le total ---*/
function displayTotal() {
    let total = 0;
    if (inCart) {
        for (i = 0; i < inCart.length; i++) {
            total = total + parseInt(inCart[i].number * inCart[i].price);
        }
    }
    cartTotal.innerHTML = total / 100;
    localStorage.setItem("total", total);
}