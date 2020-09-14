let total = localStorage.getItem('total');
let orderId = localStorage.getItem('orderId');

document.getElementById('total').innerHTML += total / 100;
document.getElementById('orderId').innerHTML += orderId;

localStorage.clear();

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {  
  window.location.href = "../index.html";
}
 
  