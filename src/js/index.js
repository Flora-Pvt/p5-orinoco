// variables 
const cartBtn = document.querySelector('.cart-btn');
const cartItems = document.querySelector('.cart-items');

// cart
let cart = [];

// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('http://localhost:3000/api/teddies');
            // result in json format
            let products = await result.json();
            // destructuring json 
            products = products.map(item => {
                const name = item.name;
                const description = item.description;
                const price = item.price;
                const image = item.imageUrl;
                const id = item._id;
                // return clean objet
                return { name, description, price, image, id };
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
                    <a href="pages/product.html?image=${product.image}&name=${product.name}&description=${product.description}&price=${product.price}&id=${product.id}">
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
    setCartValues(cart) {
        let itemsTotal = 0;
        cart.map(item => {
            itemsTotal += item.amount;
        });
        cartItems.innerText = itemsTotal;
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
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
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    // setup app
    ui.setupAPP();

    // get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    })
});