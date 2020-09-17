const url = 'http://localhost:3000/api/teddies/';

const template = document.getElementById('template-product');

let cart = JSON.parse(localStorage.getItem('cart'));

function makeRequest(url) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            let products = JSON.parse(httpRequest.responseText);            
            displayProducts(products);
        }
    }
}

function displayProducts(products) {   
    for (i = 0; i < products.length; i++) {        
        let clone = template.content.cloneNode(true);        
        let id = clone.getElementById('id');
        let img = clone.getElementById('img');  
        let link = clone.getElementById('link');      
        let name = clone.getElementById('name');
        let price = clone.getElementById('price');
        
        id.setAttribute('href', "pages/product.html?id=" + products[i]._id);
        img.setAttribute('src', products[i].imageUrl);
        link.setAttribute('href', "pages/product.html?id=" + products[i]._id);
        name.innerHTML = products[i].name;        
        price.innerHTML += products[i].price / 100;
        template.parentNode.appendChild(clone);
    }
}

makeRequest(url);

/* --- afficher le nombre de produits dans le panier après chargement de la page --- */
window.addEventListener("load", function () {
    let inCart = JSON.parse(localStorage.getItem('cart'));  
    let quantityInCart = 0;
    for (i = 0; i < inCart.length; i++) {        
        quantityInCart += inCart[i].number;        
    }
    document.querySelector('.cart-items').innerHTML = quantityInCart;
});

