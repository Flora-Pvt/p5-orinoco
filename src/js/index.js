/* --- afficher les produits --- */
function displayProducts(products) {
    for (i = 0; i < products.length; i++) {
        // détermine où afficher les informations des produits dans le HTML
        let clone = template.content.cloneNode(true);
        let id = clone.getElementById('id');
        let img = clone.getElementById('img');
        let link = clone.getElementById('link');
        let name = clone.getElementById('name');
        let price = clone.getElementById('price');
        // injecte les informations des produits dans le HTML
        id.setAttribute('href', "pages/produit.html?id=" + products[i]._id);
        img.setAttribute('src', products[i].imageUrl);
        img.setAttribute('alt', "ours en peluche " + products[i].name);
        link.setAttribute('href', "pages/produit.html?id=" + products[i]._id);
        name.innerHTML = products[i].name;
        price.innerHTML += products[i].price / 100;
        template.parentNode.appendChild(clone);
    }
}

/* --- demande les informations au serveur et appelle la fonction displayProducts --- */
makeRequest(url);

/* --- afficher le nombre de produits dans le panier à côté du logo --- */
displayCartNumber();

