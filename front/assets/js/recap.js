let priceTotalRecap = document.getElementById("price-total-recap");
let idCommande = document.getElementById('id-commande');
let navLink = document.getElementsByClassName('nav-link');

priceTotalRecap.textContent = localStorage.prixTotal;
idCommande.textContent = localStorage.orderId;
let btnInact = document.getElementById('recap-btn-nav');


btnInact.addEventListener('click', function(e){
    e.preventDefault();
})
window.addEventListener('beforeunload', function(){
    localStorage.clear();
})
setTimeout(function(){
    window.location.href = '../index.html';
}, 8000)
