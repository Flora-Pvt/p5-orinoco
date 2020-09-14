let total = JSON.parse(localStorage.getItem('total'));

document.getElementById('total').innerHTML += total / 100;

//localStorage.clear();