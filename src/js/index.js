/*let httpRequest = new XMLHttpRequest();

let products = document.querySelector('.container'); 

let url = 'http://localhost:3000/api/teddies';

httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {

        let products = document.querySelector('.container'); 
        let section = document.createElement('section');
        section.setAttribute('class', 'card-deck');


        section.innerHTML += `<article class="card">            
            <img class="card-img-top zoom" src="http://localhost:3000/images/teddy_1.jpg alt="the teddy bear Norbert" />            
            <footer class="card-body text-body">                                
                              
                <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>                                   
                
            </footer>       
        </article>`;

        products.appendChild(section);        

    } else {

    }
};
    
httpRequest.open('GET', url, true);

httpRequest.send();

function price(jsonObj) {
    let products = document.querySelector('.container');     

    let teddiesPrice = document.createElement('p');
    teddiesPrice.setAttribute('class', 'card-text'); 
    teddiesPrice.textContent = jsonObj['price'] + '€';
    products.appendChild(teddiesPrice);
}*/

// freeCodeCamp exemple //

// variables 
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');


let cart = [];

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
                // return clean objet
                return {name, description, price, image};
            });
            console.log(products);


            return products;            
        } catch (error) {
            console.log(error);
        }        
    }
}

// display products
class UI { 
    displayProducts(products) {
        let result = "";
        products.forEach(product => {
            const productsDOM = document.querySelector('.products-center');
            productsDOM.innerHTML += `
            <article class="card col-6">
                <div class="card-border">
                    <a class="" href="pages/product.html">
                        <img class="card-img-top zoom" src=${product.image} alt="teddy bear ${product.name}" />
                    </a>
                </div>
                <footer class="card-body text-body">
                    <a href="pages/product.html">
                        <p class="card-title text-body">
                            ${product.name}
                        </p>
                    </a>
                    <p class="card-text">
                        ${product.description}
                    </p>                    
                    <p class="card-text">
                        ${product.price / 100} €
                    </p>
                </footer> 
            </article>
            `;
        });
         
    }
}   

// local storage
class Storage {

}

document.addEventListener("DOMContentLoaded", ()=> {
    const ui = new UI();
    const products = new Products();

    //get all products
    products.getProducts().then(products => ui.displayProducts(products));
});