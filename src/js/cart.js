//for (var i = 0; i < localStorage.length; i++){
    // do something with localStorage.getItem(localStorage.key(i));
//}

// variables 
const cartBtn = document.querySelector('.cart-btn');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');

// cart
let cart = [];

//buttons
let buttonsDOM = [];

// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('http://localhost:3000/api/teddies');
            // result in json format
            let products = await result.json(); 
            // destructuring json 
            products = products.map(item =>{
                const name = item.name;
                const description = item.description;
                const price = item.price;
                const image = item.imageUrl;
                const id = item._id;
                // return clean objet
                return {name, description, price, image, id};
            });           
            return products;            
        } catch (error) {
            console.log(error);
        }        
    }
}

// display products
class UI {     
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button =>{
            let id = button.dataset.id;
            let inCart = cart.find(item => item._id === id);
            if(inCart) {
                //button.innerText = "In Cart";                
                button.disabled = true;
            }
            button.addEventListener('click',(event)=>{
                //event.target.innerText = "In Cart";                
                // allow just one of each product in cart
                event.target.disabled = true;
                // get product from products
                let cartItem = {...Storage.getProduct(id),amount:1};                
                // add product to the cart
                cart = [...cart,cartItem];                
                // save cart in local storage
                Storage.saveCart(cart);                
                // set cart values
                this.setCartValues(cart);
                // display cart items
                this.addCartItem(cartItem);
                // show the cart    
                this.showCart();            
                });            
        });
    } 
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.amount / 100;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;        
    }
    addCartItem(item){
        const div = document.createElement('div');        
        div.classList.add('cart-item');
        div.classList.add('card');
        div.innerHTML = `    
 
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src=${item.image} class="card-img" alt="teddy bear ${item.name}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <p class="card-title">${item.name}</p>
        <p class="card-text">${item.price / 100} €</p>
        <!-- item functionality -->
        <div class="row ">
            <button type="button" class="add btn btn-outline-dark align-middle" data-id=${item._id}>+</button>
            <p class="item-amount align-middle">${item.amount}</p>
            <button type="button" class="take-off btn btn-outline-dark align-middle" data-id=${item._id}>-</button>
        </div>
        <button type="button" class="remove-item btn btn-outline-dark" data-id=${item._id}>remove</button>        
      </div>
    </div>
              
     `;
    cartContent.appendChild(div);    
    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    }    
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);        
        cartBtn.addEventListener('click',this.showCart);        
    }
    populateCart(cart){
        cart.forEach(item =>this.addCartItem(item));
    }    
    cartLogic() {
        // clear cart button
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        });
        // cart functionality
        cartContent.addEventListener('click', event => {
            if(event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;                
                cartContent.removeChild(removeItem.parentElement.parentElement.parentElement.parentElement);
                this.removeItem(id);
            } else if (event.target.classList.contains("add")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item._id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innertText = tempItem.amount;
            } else if (event.target.classList.contains("take-off")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item._id === id);
                tempItem.amount = tempItem.amount - 1;                
                if(tempItem.amount > 0){
                Storage.saveCart(cart);
                this.setCartValues(cart);
                lowerAmount.previousElementSibling.innertText = tempItem.amount;
                } else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        });
    }
    clearCart() {
        cart = [];
        this.setCartValues(cart);
        Storage.saveCart(cart);
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttons.forEach(button => {
            button.disabled = false;            
        });
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }        
    }
    removeItem(id) {
        cart = cart.filter(item => item._id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;        
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}   

// local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        // check if items exist, if not nothing change
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    const ui = new UI();
    const products = new Products();
    // setup app
    ui.setupAPP();

    // get all products
    products.getProducts().then(products => {
    
    Storage.saveProducts(products);
    }).then(()=>{
        ui.getBagButtons();
        ui.cartLogic();
    });
});
