/* --- définir les éléments du produit --- */
const productValues = new URLSearchParams(window.location.search);

const image = productValues.get('image');
const name = productValues.get('name');
const description = productValues.get('description');
const price = productValues.get('price');
const id = productValues.get('id');

/* --- afficher le produit --- */
const productDOM = document.querySelector('.row');
productDOM.innerHTML += `  
        <img class="col-md-8" src=${image} alt="teddy bear ${name}" />           
        
        <section class="col-md-4">
            <h1>
                ${name}
            </h1>            
            <p>
                ${description}
            </p>                    
            <p>
                ${price / 100} €
            </p>
            <button type="button" class="bag-btn btn-block btn-dark py-2" data-id=${id}>
                <svg class="text-light bi bi-basket2" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M1.111 7.186A.5.5 0 0 1 1.5 7h13a.5.5 0 0 1 .489.605l-1.5 7A.5.5 0 0 1 13 15H3a.5.5 0 0 1-.489-.395l-1.5-7a.5.5 0 0 1 .1-.42zM2.118 8l1.286 6h9.192l1.286-6H2.118z"/>
                        <path fill-rule="evenodd" d="M11.314 1.036a.5.5 0 0 1 .65.278l2 5a.5.5 0 1 1-.928.372l-2-5a.5.5 0 0 1 .278-.65zm-6.628 0a.5.5 0 0 0-.65.278l-2 5a.5.5 0 1 0 .928.372l2-5a.5.5 0 0 0-.278-.65z"/>
                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zM0 6.5A.5.5 0 0 1 .5 6h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1z"/>
                </svg>                
                        ADD                
            </button>
        </section> 
    </article>`;

/* --- ajouter au stockage local --- */
// l'ajout se produira au click sur le bouton ADD
document.querySelector(".bag-btn").addEventListener('click', function(event) {
    // le produit est enregistré en objet
    let product = {
        id: id,
        name: name,
        price: price,
        image: image,
        description: description
    }

    // ajoute une key au stockage local pour le panier
    const cart = localStorage.getItem('cart');

    if (cart) {
        // transforme les données en tableau
        inCart = JSON.parse(cart);
        //ajoute le produit au panier 
        inCart.push(product);
        // transforme les données en JSON pour les stocker dans le stockage local
        localStorage.setItem('cart', JSON.stringify(inCart));        
    } else {
        // contenu déclaré comme un tableau
        inCart = [];
        //ajoute le produit au panier
        inCart.push(product);
        // transforme les données en JSON pour les stocker dans le stockage local
        localStorage.setItem('cart', JSON.stringify(inCart));        
    }
    event.target.disabled = true;

    /* --- afficher le nombre de produits dans le panier au click--- */
    // récupère le nombre de produits dans la key du panier
    const quantityInCart = JSON.parse(localStorage.getItem('cart')).length; 
    // affiche le nombre à côté du logo du panier    
    document.querySelector('.cart-items').innerHTML = `${quantityInCart}`;   
});

/* --- afficher le nombre de produits dans le panier après chargement de la page --- */
window.addEventListener("load", function() {
    // récupère le nombre de produits dans la key du panier
    const quantityInCart = JSON.parse(localStorage.getItem('cart')).length; 
    // affiche le nombre à côté du logo du panier  
    document.querySelector('.cart-items').innerHTML = `${quantityInCart}`;
})


