const url = 'http://localhost:3000/api/teddies'

/* --- obtient les datas du serveur --- */
export class DataSource {
  /* --- page index : demande tous les produits --- */
  async getProducts () {
    try {
      const request = await fetch(url)
      const products = await request.json()
      return products
    } catch (error) {
      alert(error)
    }
  }

  /* --- page produit : demande seulement un produit --- */
  async getProduct (productId) {
    try {
      const request = await fetch(`${url}/${productId}`)
      const products = await request.json()
      return products
    } catch (error) {
      alert(error)
    }
  }

  /* --- envoie les informations au serveur pour obtenir le n° de commande --- */
  async postData (inCart) {
    const inputOrder = document.getElementsByTagName('input')
    const orderBtn = document.getElementById('order-btn')
    const formOrder = document.getElementById('form')
    orderBtn.addEventListener('click', () => {
      // empêche d'ouvrir une nouvelle page avant d'envoyer les données
      formOrder.addEventListener('submit', function (event) {
        event.preventDefault()
      })
      if (formOrder.checkValidity()) {
        // crée un tableau products avec les id des produits du panier
        const products = []
        inCart.forEach(inCart => {
          products.push(inCart._id)
        })

        // crée l'objet contact
        const contact = {
          firstName: inputOrder[1].value,
          lastName: inputOrder[2].value,
          address: inputOrder[3].value,
          city: inputOrder[5].value,
          email: inputOrder[0].value
        }

        // crée data comme objet contact + tableau products
        const data = { contact, products }

        // définit notre requête d'envoi
        const request = new Request('http://localhost:3000/api/teddies/order', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })

        // envoi les données
        fetch(request)
          // reçoit les données
          .then(function (response) {
            return response.json()
          })
          // les traite pour obtenir le numéro de commande
          .then(function (data) {
            const orderId = data.orderId
            localStorage.setItem('orderId', orderId)
            window.location.href = 'commande.html'
          })
          .catch(function (error) {
            alert(error)
          })
      }
    })
  }
}
