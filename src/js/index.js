/* ---  récupérer les produits --- */
class Products {
    async getProducts() {
        try {
            // récupère les données des produits à partir du serveur
            let result = await fetch('http://localhost:3000/api/teddies');
            // données au format json
            let products = await result.json();
            // définit les valeurs des produits
            products = products.map(item => {
                const name = item.name;
                const description = item.description;
                const price = item.price;
                const image = item.imageUrl;
                const id = item._id;
                // retourne l'objet simplifié
                return { name, description, price, image, id };
            });
            //retourne tous les produits
            return products;
        // affiche une erreur en cas d'exception    
        } catch (error) {
            console.log(error);
        }
    }
}

/* --- afficher les produits --- */
class UI {
    // crée une méthode
    displayProducts(products) {
        // pour chaque produit contenu dans le serveur
        products.forEach(product => {
            // sélectionne l'endroit où afficher les produits
            const productsDOM = document.querySelector('.products-center');
            // à cet endroit affiche les données écrites ci-dessous
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
    }}


/* --- déclenchement au chargement du DOM --- */
document.addEventListener("DOMContentLoaded", () => {
    // déclare ui comme une nouvelle instance UI
    const ui = new UI();
    // déclare products comme une nouvelle instance Products
    const products = new Products();    

    // les produits utilises la méthode getProducts en promesse
    products.getProducts().then(products => {
        // l'instance ui utilise la méthode displayProducts avec les produits en argument
        ui.displayProducts(products);        
    })
});


/* --- afficher le nombre de produits dans le panier après chargement de la page --- */
// cart
let cart = [];

window.addEventListener("load", function() {
// récupère le nombre de produits dans la key du panier
const quantityInCart = JSON.parse(localStorage.getItem('cart')).length; 
// affiche le nombre à côté du logo du panier    
document.querySelector('.cart-items').innerHTML = `${quantityInCart}`;   
});