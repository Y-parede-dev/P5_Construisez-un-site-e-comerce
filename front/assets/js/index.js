// Récupération de la liste

let list = document.getElementById('list');

// Récupération de l'URL des caméras dans l'API fournie par le backend

const urlCam = "http://localhost:3000/api/cameras";

// recuperation des varientes de toutes les cameras 
fetch(urlCam)
.then(response=>{
    // on demande de recuperer au format json (car plus simple a manipuler en JS)
    response.json()
    .then(data=>{
    // puis on recherche les éléments
        data.forEach(element=>{
            displayElt(element);
        })
    })
})
// displayElt sert a afficher la page accueil 
 function displayElt(element){
    
    // création des éléments qui constitue la liste de produit
    let elt = document.createElement('LI');
    let imageElt = document.createElement('IMG');
    let name = document.createElement('H3');
    let description = document.createElement('P');
    let price = document.createElement('P');
    
    // ajout des classes 
    addClass(elt,"list-element-vue", "card", 'col', "col-sm-12", "col-md-3", "bg-light");
    addClass(imageElt, "img-acceuil", "card-img-top");
    addClass(description, "description");
    addClass(price, "price", "bg-dark");
    addClass(name,'name-camera');
    
    // ajout des element a la liste 
    name.innerHTML = element.name;
    imageElt.src = element.imageUrl;
    price.innerHTML = "<strong>" + (element.price/100).toFixed(2) + " €</strong>";
    description.innerHTML = "<em>" + element.description + "</em>";
    
    elt.appendChild(name);
    elt.appendChild(imageElt);
    elt.appendChild(price);
    elt.appendChild(description);
    list.appendChild(elt);

    // creation evenement sur le click et le survol des element 
    elt.addEventListener('click', function(){
        document.location.href = "./html/produit.html?id=" + element._id;
    })
    elt.addEventListener("mouseover", function(){
        addClass(imageElt, "list-element-hover");
    })
    elt.addEventListener("mouseout", function(){
        imageElt.classList.remove('list-element-hover');
    })   
}
import {addClass} from './modules/functions.js';