!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=332)}({332:function(e,t,n){"use strict";function r(e,t,n,r,a,i,o){try{var u=e[i](o),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,i){var o=e.apply(t,n);function u(e){r(o,a,i,u,c,"next",e)}function c(e){r(o,a,i,u,c,"throw",e)}u(void 0)}))}}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.r(t);var o="http://localhost:3000/api/teddies",u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,r,u,c,l;return t=e,(n=[{key:"getProducts",value:(l=a(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(o);case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n);case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])}))),function(){return l.apply(this,arguments)})},{key:"getProduct",value:(c=a(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(o,"/").concat(t));case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])}))),function(e){return c.apply(this,arguments)})},{key:"postData",value:(u=a(regeneratorRuntime.mark((function e(t){var n,r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=document.getElementsByTagName("input"),r=document.getElementById("order-btn"),a=document.getElementById("form"),r.addEventListener("click",(function(){if(a.addEventListener("submit",(function(e){e.preventDefault()})),a.checkValidity()){var e=[];t.forEach((function(t){e.push(t._id)}));var r={contact:{firstName:n[1].value,lastName:n[2].value,address:n[3].value,city:n[5].value,email:n[0].value},products:e},i=new Request("http://localhost:3000/api/teddies/order",{method:"POST",body:JSON.stringify(r),headers:new Headers({"Content-Type":"application/json"})});fetch(i).then((function(e){return e.json()})).then((function(e){var t=e.orderId;localStorage.setItem("orderId",t),window.location.href="commande.html"})).catch((function(e){alert(e)}))}}));case 4:case"end":return e.stop()}}),e)}))),function(e){return u.apply(this,arguments)})}])&&i(t.prototype,n),r&&i(t,r),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.template=document.getElementById("template")}var t,n,r;return t=e,(n=[{key:"displayCartNumber",value:function(e){var t=0;null!=e&&e.forEach((function(e){t+=e.number})),document.querySelector(".cart-items").innerHTML=t}},{key:"displayProductsBase",value:function(e,t){var n=t.getElementById("img"),r=t.getElementById("name"),a=t.getElementById("price");n.setAttribute("src",e.imageUrl),n.setAttribute("alt","ours en peluche "+e.name),r.innerHTML=e.name,a.innerHTML+=e.price/100+" €"}},{key:"displayProducts",value:function(e){var t=this;e.forEach((function(e){var n=t.template.content.cloneNode(!0);t.displayProductsBase(e,n);var r=n.getElementById("id"),a=n.getElementById("link");r.setAttribute("href","pages/produit.html?id="+e._id),a.setAttribute("href","pages/produit.html?id="+e._id),t.template.parentNode.appendChild(n)}))}},{key:"displayProduct",value:function(e){var t=this.template.content.cloneNode(!0);this.displayProductsBase(e,t);var n=t.getElementById("description"),r=t.getElementById("colors"),a=e.colors,i=document.getElementById("add");n.innerHTML=e.description,a.forEach((function(e){var t=document.createElement("option");t.setAttribute("for","colors"),t.innerHTML=e,r.appendChild(t)})),i.dataset.id=e._id,this.template.parentNode.appendChild(t)}},{key:"displayCart",value:function(e){var t=this;null==e||0===e.length?(document.getElementById("no-product").innerHTML="Vous n'avez pas d'ourson dans le panier.",document.getElementById("order-btn").disabled=!0):e.forEach((function(e){var n=t.template.content.cloneNode(!0),r=e;t.displayProductsBase(r,n);var a=n.getElementById("product-total"),i=n.getElementById("reference"),o=n.getElementById("quantity"),u=n.getElementById("remove"),c=n.getElementById("add");n.getElementById("clear").dataset.id=r._id,c.dataset.id=r._id,u.dataset.id=r._id,i.innerHTML+=r._id,o.innerHTML=r.number,a.innerHTML+=r.number*r.price/100+" €",t.template.parentNode.appendChild(n)}))}},{key:"displayProductTotal",value:function(e){event.target.parentElement.previousElementSibling.children[1].innerHTML=e[0].number*e[0].price/100+" €"}},{key:"displayTotal",value:function(e){var t=document.querySelector(".cart-total"),n=0;e&&e.forEach((function(e){n+=parseInt(e.number*e.price)})),t.innerHTML=n/100,localStorage.setItem("total",n)}},{key:"displayOrder",value:function(e){if(e){var t=this.template.content.cloneNode(!0),n=localStorage.getItem("total");t.getElementById("order"),t.getElementById("total").innerHTML+=n/100,t.getElementById("orderId").innerHTML+=e,this.template.parentNode.appendChild(t),localStorage.clear()}}}])&&c(t.prototype,n),r&&c(t,r),e}();function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.dom=new l}var t,n,r;return t=e,(n=[{key:"changeQuantity",value:function(e){var t=document.getElementById("cart"),n=event.target.dataset.id,r=e.filter((function(e){return e._id===n}));event.target.classList.contains("remove")&&r[0].number>1?(r[0].number--,event.target.nextElementSibling.innerHTML=r[0].number):event.target.classList.contains("add")&&(r[0].number++,event.target.previousElementSibling.innerHTML=r[0].number);var a=e.filter((function(e){return e._id!==n}));a.push(r[0]),localStorage.setItem("cart",JSON.stringify(a)),this.dom.displayCartNumber(e),t&&(this.dom.displayTotal(e),this.dom.displayProductTotal(r))}},{key:"addProduct",value:function(t,n,r){var a=this,i=document.getElementById("add"),o=document.getElementById("feedback");i.addEventListener("click",(function(){t&&!0===colors.validity.valid?t.some((function(e){return e._id===r}))?((new e).changeQuantity(t),o.innerHTML="Quantité dans le panier : "):(n.number=1,t.push(n),localStorage.setItem("cart",JSON.stringify(t)),quantity.innerHTML=n.number,o.innerHTML="Quantité dans le panier : ",a.dom.displayCartNumber(t)):!1===colors.validity.valid?o.innerHTML="Veuillez choisir une couleur.":(t=[],n.number=1,t.push(n),localStorage.setItem("cart",JSON.stringify(t)),quantity.innerHTML=n.number,o.innerHTML="Quantité dans le panier : ",a.dom.displayCartNumber(t))}))}},{key:"cartOperations",value:function(e){var t=this;document.querySelector(".cart-content").addEventListener("click",(function(n){if(n.target.classList.contains("clear")){var r=n.target.dataset.id,a=e.filter((function(e){return e._id!==r}));localStorage.setItem("cart",JSON.stringify(a)),location.reload()}else(n.target.classList.contains("add")||n.target.classList.contains("remove"))&&t.changeQuantity(e)}))}},{key:"formSubmit",value:function(){var e=document.getElementById("form");e.addEventListener("submit",(function(t){!1===e.checkValidity()&&(t.preventDefault(),t.stopPropagation()),e.classList.add("was-validated")}),!1)}}])&&d(t.prototype,n),r&&d(t,r),e}();window.onload=function(){var e=window.location.search,t=new URLSearchParams(e).get("id"),n=JSON.parse(localStorage.getItem("cart")),r=document.getElementById("index"),a=document.getElementById("cart"),i=localStorage.getItem("orderId"),o=new u,c=new l,d=new s;switch(!0){case null!==r:o.getProducts().then((function(e){c.displayProducts(e),c.displayCartNumber(n)}));break;case null!==t:o.getProduct(t).then((function(e){c.displayProduct(e),c.displayCartNumber(n),d.addProduct(n,e,t)}));break;case null!==a:c.displayCart(n),c.displayTotal(n),c.displayCartNumber(n),d.cartOperations(n),d.formSubmit(),o.postData(n);break;default:c.displayOrder(i)}}}});