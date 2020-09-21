/* --- déclare les variables --- */
let addButton = document.getElementById('bag-btn');
let feedback = document.getElementById('feedback');
let quantity = document.getElementById('quantity');

/* --- cherche l'id du produit cliqué dans l'url --- */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

/* --- affiche le produit --- */
function displayProducts(products) {
    // détermine où afficher les informations du produit dans le HTML
    let clone = template.content.cloneNode(true);
    let img = clone.getElementById('img');
    img.setAttribute('src', products.imageUrl);
    let name = clone.getElementById('name');
    let description = clone.getElementById('description');
    let colors = clone.getElementById('colors');
    let price = clone.getElementById('price');
    // injecte les informations du produit dans le HTML
    name.innerHTML = products.name;
    description.innerHTML = products.description;
    for (i = 0; i < products.colors.length; i++) {
        let color = document.createElement("option");
        color.setAttribute("for", "colors");
        color.innerHTML = products.colors[i];
        colors.appendChild(color);
    }
    price.innerHTML += products.price / 100;

    /* --- au clic sur "ajouter" enregistre le produit dans le panier (dans le stockage local) --- */
    addButton.addEventListener('click', function () {
        const cart = localStorage.getItem('cart'); // ajoute une clé au stockage local pour le panier
        if (cart && colors.validity.valid === true) {
            inCart = JSON.parse(cart);
            /* --- si le produit est déjà dans le panier met à jour sa quantité  --- */
            let isPresent = inCart.some(p => p._id == productId);
            if (isPresent) {
                let id = productId;
                let ourProduct = inCart.filter(p => p._id == id);
                ourProduct[0].number++;
                changeQuantity(id, ourProduct, quantity);
                feedback.innerHTML = "produit ajouté au panier";
            } else {
                /* --- ajoute ce produit pour la première fois au stockage local --- */
                firstAddProduct(products);
            }
        } else if (colors.validity.valid === false) {
            feedback.innerHTML = "Veuillez choisir une couleur";
        } else {
            inCart = [];
            /* --- ajoute un tout premier produit au stockage local --- */
            firstAddProduct(products);
        }
        /* --- afficher le nouveau nombre de produits à côté du logo--- */
        displayCartNumber();
    });
    template.parentNode.appendChild(clone);
}

/* --- demande les informations au serveur et appelle la fonction displayProducts --- */
makeRequest(url + productId);

/* --- afficher le nombre de produits dans le panier à côté du logo --- */
displayCartNumber();
