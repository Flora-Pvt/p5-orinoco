// variables 
const clearCartBtn = document.querySelector('.clear-cart');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');

const template = document.getElementById('template-product');   

function displayProducts() { 
  let products = JSON.parse(localStorage.getItem('cart'));
  console.log(products); 
    
    for (i = 0; i < products.length; i++) {            
      console.log(products[i].name); 
      let clone = template.content.cloneNode(true);
      let img = clone.getElementById('img');
      img.setAttribute('src', products[i].imageUrl);
      let name = clone.getElementById('name');
      let price = clone.getElementById('price');        
      name.innerHTML = products[i].name; 
      price.innerHTML += products[i].price / 100;
      template.parentNode.appendChild(clone);     
  }

    // déclare le total
    let total = 0; 
    for (i = 0; i < products.length; i++) {  
        total = total + parseInt(products[i].price);
    }
    // affiche le total dans le html
    cartTotal.innerHTML = total / 100;
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