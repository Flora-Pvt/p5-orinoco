// variables 
const cartBtn = document.querySelector('.cart-btn');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');

function displayProducts() { 
    let products = JSON.parse(localStorage.getItem('cart')); 
    for (let i in products) {
        const row = document.createElement('tr');
        row.classList.add('cart-item');        
        row.innerHTML += `
        <td class="col-4">
          <img src=${products[i].image} class="card-img" alt="teddy bear ${products[i].name}">
        </td>  
            <td class="col-4">${products[i].name}</td>
            <td class="col-4 price">${products[i].price / 100} €</td>  
         `;
    cartContent.appendChild(row);        
    }
    // déclare le tableau 
    let board = document.querySelector('table');
    // déclare le total
    let total = 0; 
    // parcoure chaque ligne du tableau
    for (i = 0; i < board.rows.length; i++) {
      // ajoute chaque cellule prix au total, cellules analysées et converties en un entier   
        total = total + parseInt(board.rows[i].cells[2].innerHTML);
    }
    // affiche le total dans le html
    cartTotal.innerHTML = total;
}
 
displayProducts();

/* --- supprimer tous les produits du panier --- */
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

//<p class="item-amount">${amount}</p>