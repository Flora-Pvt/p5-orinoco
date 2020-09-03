// variables 
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');

// cart
let cart = [];

//buttons
let buttonsDOM = [];

// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('http://localhost:3000/api/teddies');
            // result in json format
            let products = await result.json(); 
            // destructuring json 
            products = products.map(item =>{
                const name = item.name;
                const description = item.description;
                const price = item.price;
                const image = item.imageUrl;
                const id = item._id;
                // return clean objet
                return {name, description, price, image, id};
            });           
            return products;            
        } catch (error) {
            console.log(error);
        }        
    }
}

// display products
class UI { 
    displayProducts(products) {        
        products.forEach(product => {
            const productsDOM = document.querySelector('.products-center');
            productsDOM.innerHTML += `
            <article class="card col-12 col-md-6">
                <header class="card-img-border">
                    <a href="pages/product.html?image=${product.image}&name=${product.name}&description=${product.description}&price=${product.price}&id=${product.id}">
                        <img class="card-img-top zoom" src=${product.image} alt="teddy bear ${product.name}" />
                    </a>
                </header>
                <section class="card-body text-body">
                    <a class="bag-btn" data-id=${product.id}>
                        <p class="card-title text-body">
                            ${product.name}
                        </p>
                    </a>                                      
                    <p class="card-text">
                        ${product.price / 100} €
                    </p>
                </section> 
            </article>
            `;
        });        
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button =>{
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart) {
                //button.innerText = "In Cart";                
                button.disabled = true;
            }
            button.addEventListener('click',(event)=>{
                //event.target.innerText = "In Cart";                
                // allow just one of each product in cart
                event.target.disabled = true;
                // get product from products
                let cartItem = {...Storage.getProduct(id),amount:1};                
                // add product to the cart
                cart = [...cart,cartItem];                
                // save cart in local storage
                Storage.saveCart(cart);                
                // set cart values
                this.setCartValues(cart);
                // display cart items
                this.addCartItem(cartItem);
                // show the cart    
                this.showCart();            
                });            
        });
    } 
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.amount / 100;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;        
    }
    addCartItem(item){
        const div = document.createElement('div');        
        div.classList.add('cart-item');
        div.innerHTML = `        
            <img class="" src=${item.image} alt="teddy bear ${item.name}" />     
            <h4 class="text-body">
                ${item.name}
            </h4>       
            <h5 class="card-text">
                ${item.price / 100} €
            </h5>           
            <!-- item functionality -->
            <p><span class="add" data-id=${item.id}>+</span><span class="item-amount">${item.amount}</span><span class="take-off" data-id=${item.id}>-</span></p>
            <span class="remove-item" data-id=${item.id}>remove</span>             
     `;
    cartContent.appendChild(div);    
    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    }    
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);        
        cartBtn.addEventListener('click',this.showCart);
        closeCartBtn.addEventListener('click',this.hideCart);
    }
    populateCart(cart){
        cart.forEach(item =>this.addCartItem(item));
    }
    hideCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    }
    cartLogic() {
        // clear cart button
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        });
        // cart functionality
        cartContent.addEventListener('click', event => {
            if(event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;                
                cartContent.removeChild(removeItem.parentElement);
                this.removeItem(id);
            } else if (event.target.classList.contains("add")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innertText = tempItem.amount;
            } else if (event.target.classList.contains("take-off")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;                
                if(tempItem.amount > 0){
                Storage.saveCart(cart);
                this.setCartValues(cart);
                lowerAmount.previousElementSibling.innertText = tempItem.amount;
                } else {
                    cartContent.removeChild(lowerAmount.parentElement);
                    this.removeItem(id);
                }
            }
        });
    }
    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        console.log(cartContent.children);

        while(cartContent.children.lenght>0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
    removeItem(id) {
        cart = cart.filter(item => item.id !==id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;        
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id ===id);
    }
}   

// local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        // check if items exist, if not nothing change
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    const ui = new UI();
    const products = new Products();
    // setup app
    ui.setupAPP();

    // get all products
    products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
    }).then(()=>{
        ui.getBagButtons();
        ui.cartLogic();
    });
});