export class DOM {
  constructor () {
    this.template = document.getElementById('template')
  }

  /* --- affiche le nombre de produits à côté du logo du panier --- */
  displayCartNumber (inCart) {
    let quantityInCart = 0
    if (inCart != null) {
      inCart.forEach(inCart => {
        quantityInCart += inCart.number
      })
    }
    document.querySelector('.cart-items').innerHTML = quantityInCart
  }

  /* --- fonction réutilisable pour afficher la base des produits --- */
  displayProductsBase (products, clone) {
    // détermine où afficher les informations des produits dans le HTML
    const img = clone.getElementById('img')
    const name = clone.getElementById('name')
    const price = clone.getElementById('price')
    // injecte les informations des produits dans le HTML
    img.setAttribute('src', products.imageUrl)
    img.setAttribute('alt', 'ours en peluche ' + products.name)
    name.innerHTML = products.name
    price.innerHTML += products.price / 100 + ' €'
  }

  /* --- affiche tous les produits sur la page index --- */
  displayProducts (products) {
    products.forEach(products => {
      const clone = this.template.content.cloneNode(true)
      this.displayProductsBase(products, clone)
      // affiche les informations supplémentaires des produits dans le HTML
      const id = clone.getElementById('id')
      const link = clone.getElementById('link')
      id.setAttribute('href', 'pages/produit.html?id=' + products._id)
      link.setAttribute('href', 'pages/produit.html?id=' + products._id)
      this.template.parentNode.appendChild(clone)
    })
  }

  /* --- affiche un seul produit sur la page produit --- */
  displayProduct (products) {
    const clone = this.template.content.cloneNode(true)
    this.displayProductsBase(products, clone)
    // affiche les informations supplémentaires du produit dans le HTML
    const description = clone.getElementById('description')
    const colors = clone.getElementById('colors')
    const productColors = products.colors
    const addBtn = document.getElementById('add')
    description.innerHTML = products.description
    productColors.forEach(productColors => {
      const color = document.createElement('option')
      color.setAttribute('for', 'colors')
      color.innerHTML = productColors
      colors.appendChild(color)
    })
    addBtn.dataset.id = products._id
    this.template.parentNode.appendChild(clone)
  }

  /* --- affiche tous les produits sur la page panier --- */
  displayCart (inCart) {
    if (inCart == null || inCart.length === 0) {
      document.getElementById('no-product').innerHTML = "Vous n'avez pas d'ourson dans le panier."
      const orderBtn = document.getElementById('order-btn')
      orderBtn.disabled = true
    }
    else {
      inCart.forEach(inCart => {
        const clone = this.template.content.cloneNode(true)
        const products = inCart
        this.displayProductsBase(products, clone)
        // affiche les informations supplémentaires des produits dans le HTML
        const productTotal = clone.getElementById('product-total')
        const reference = clone.getElementById('reference')
        const quantity = clone.getElementById('quantity')
        const removeBtn = clone.getElementById('remove')
        const addBtn = clone.getElementById('add')
        const clearBtn = clone.getElementById('clear')
        clearBtn.dataset.id = products._id
        addBtn.dataset.id = products._id
        removeBtn.dataset.id = products._id
        reference.innerHTML += products._id
        quantity.innerHTML = products.number
        productTotal.innerHTML += (products.number * products.price) / 100 + ' €'
        this.template.parentNode.appendChild(clone)
      })
    }
  }

  /* --- affiche le prix total d'un produit selon sa quantité --- */
  displayProductTotal (ourProduct) {
    const parent = event.target.parentElement
    const parentTotal = parent.previousElementSibling
    const children = parentTotal.children
    const productTotal = children[1]
    productTotal.innerHTML = (ourProduct[0].number * ourProduct[0].price) / 100 + ' €'
  }

  /* --- affiche le prix total de tous les produits --- */
  displayTotal (inCart) {
    const cartTotal = document.querySelector('.cart-total')
    let total = 0
    if (inCart) {
      inCart.forEach(inCart => {
        total = total + parseInt(inCart.number * inCart.price)
      })
    }
    cartTotal.innerHTML = total / 100
    localStorage.setItem('total', total)
  }

  /* --- affiche le n° de commande et le total sur la page commande --- */
  displayOrder (orderId) {
    if (orderId) {
      const clone = this.template.content.cloneNode(true)
      const total = localStorage.getItem('total')
      clone.getElementById('order')
      clone.getElementById('total').innerHTML += total / 100
      clone.getElementById('orderId').innerHTML += orderId
      this.template.parentNode.appendChild(clone)
      localStorage.clear()
    }
  }
}
