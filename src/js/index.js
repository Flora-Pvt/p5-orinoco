import { DataSource } from './dataSource.js'
import { DOM } from './dom.js'
import { Order } from './order.js'

function main () {
  /* --- obtient l'id du produit à afficher sur la page produit --- */
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const productId = urlParams.get('id')

  /* --- variables utilisées par notre fonction main--- */
  const inCart = JSON.parse(localStorage.getItem('cart'))
  const index = document.getElementById('index')
  const cartPage = document.getElementById('cart')
  const orderId = localStorage.getItem('orderId')

  const data = new DataSource()
  const dom = new DOM()
  const order = new Order()

  switch (true) {
    /* --- fonctionnalités de la page index --- */
    case index !== null:
      data
        .getProducts()
        .then(products => {
          dom.displayProducts(products)
          dom.displayCartNumber(inCart)
        })
      break
    /* --- fonctionnalités de la page produit --- */
    case productId !== null:
      data
        .getProduct(productId)
        .then(products => {
          dom.displayProduct(products)
          dom.displayCartNumber(inCart)
          order.addProduct(inCart, products, productId)
        })
      break
    /* --- fonctionnalités de la page panier --- */
    case cartPage !== null:
      dom.displayCart(inCart)
      dom.displayTotal(inCart)
      dom.displayCartNumber(inCart)
      order.cartOperations(inCart)
      order.formSubmit()
      data.postData(inCart)
      break
    /* --- fonctionnalités de la page commande --- */
    default:
      dom.displayOrder(orderId)
  }
}

window.onload = main
