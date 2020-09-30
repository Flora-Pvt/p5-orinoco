function main () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const productId = urlParams.get('id')

  const inCart = JSON.parse(localStorage.getItem('cart'))
  const index = document.getElementById('index')
  const cartPage = document.getElementById('cart')
  const orderId = localStorage.getItem('orderId')

  const data = new DataSource()
  const dom = new DOM()
  const order = new Order()

  /* --- fonctionnalités de la page index --- */
  if (index) {
    data
      .getProducts()
      .then(products => {
        dom.displayProducts(products)
        dom.displayCartNumber(inCart)
      })
  }

  /* --- fonctionnalités de la page produit --- */
  else if (productId) {
    data
      .getProduct(productId)
      .then(products => {
        dom.displayProduct(products)
        dom.displayCartNumber(inCart)
        order.addProduct(inCart, products, productId)
      })
  }

  /* --- fonctionnalités de la page panier --- */
  else if (cartPage) {
    dom.displayCart(inCart)
    dom.displayTotal(inCart)
    dom.displayCartNumber(inCart)
    order.operations(inCart)
    order.formSubmit()
    data.postData(inCart)
  }

  /* --- fonctionnalités de la page commande --- */
  else if (orderId) {
    dom.displayOrder(orderId)
  }
}

window.onload = main
