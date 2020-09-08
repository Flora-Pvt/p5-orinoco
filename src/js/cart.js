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
    let board = document.querySelector('table');
    let total = 0;
    console.log(board.rows.length);

    for (i = 1; i < board.rows.length; i++) {   
        total = total + parseInt(board.rows[i].cells[3].innerHTML);
    }

    cartTotal.innerHTML = `${total}`;
}
  
    

displayProducts();

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