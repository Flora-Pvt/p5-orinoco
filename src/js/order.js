class Order {
  constructor () {
    this.dom = new DOM()
  }

  /* --- fonction réutilisable qui change la quantité du produit --- */
  changeQuantity (inCart) {
    const cartPage = document.getElementById('cart')
    const id = event.target.dataset.id
    const ourProduct = inCart.filter(p => p._id === id)
    // si bouton "-" retire le produit
    if (event.target.classList.contains('remove') && ourProduct[0].number > 1) {
      ourProduct[0].number--
      const quantity = event.target.nextElementSibling
      quantity.innerHTML = ourProduct[0].number
    }
    // si bouton d'ajout, ajoute le produit
    else if (event.target.classList.contains('add')) {
      ourProduct[0].number++
      const quantity = event.target.previousElementSibling
      quantity.innerHTML = ourProduct[0].number
    }
    // enregistre le produit avec sa nouvelle quantité au panier
    const newCart = inCart.filter(p => p._id !== id)
    newCart.push(ourProduct[0])
    localStorage.setItem('cart', JSON.stringify(newCart))
    // affiche les nouveaux totaux et quantité obtenus
    this.dom.displayCartNumber(inCart)
    if (cartPage) {
      this.dom.displayTotal(inCart)
      this.dom.displayProductTotal(ourProduct)
    }
  }

  /* --- page produit : ajoute un produit en fonction du panier --- */
  addProduct (inCart, products, productId) {
    const addBtn = document.getElementById('add')
    const feedback = document.getElementById('feedback')
    // enregistre le produit au panier (dans le stockage local)
    addBtn.addEventListener('click', () => {
      if (inCart && colors.validity.valid === true) {
        // si déjà dans le panier met à jour sa quantité
        const isPresent = inCart.some(p => p._id === productId)
        if (isPresent) {
          const order = new Order()
          order.changeQuantity(inCart)
          feedback.innerHTML = 'Quantité dans le panier : '
        }
        else {
          // ajoute ce produit pour la première fois
          products.number = 1
          inCart.push(products)
          localStorage.setItem('cart', JSON.stringify(inCart))
          quantity.innerHTML = products.number
          feedback.innerHTML = 'Quantité dans le panier : '
          this.dom.displayCartNumber(inCart)
        }
      }
      else if (colors.validity.valid === false) {
        feedback.innerHTML = 'Veuillez choisir une couleur.'
      }
      else {
        inCart = []
        // ajoute un tout premier produit au stockage local
        products.number = 1
        inCart.push(products)
        localStorage.setItem('cart', JSON.stringify(inCart))
        quantity.innerHTML = products.number
        feedback.innerHTML = 'Quantité dans le panier : '
        console.log(this.dom, inCart)
        this.dom.displayCartNumber(inCart) // /!\ ne marche pas
      }
    })
  }

  /* --- page panier : supprime, ajoute ou enlève --- */
  operations (inCart) {
    const cartContent = document.querySelector('.cart-content')
    cartContent.addEventListener('click', event => {
      if (event.target.classList.contains('clear')) {
        const id = event.target.dataset.id
        const newCart = inCart.filter(p => p._id !== id)
        localStorage.setItem('cart', JSON.stringify(newCart))
        location.reload()
      }
      else if (event.target.classList.contains('add')) {
        this.changeQuantity(inCart)
      }
      else if (event.target.classList.contains('remove')) {
        this.changeQuantity(inCart)
      }
    })
  }

  /* --- affiche les aides pour le formulaire --- */
  formSubmit () {
    const formOrder = document.getElementById('form')
    formOrder.addEventListener('submit', function (event) {
      if (formOrder.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      formOrder.classList.add('was-validated')
    }, false)
  }
}
