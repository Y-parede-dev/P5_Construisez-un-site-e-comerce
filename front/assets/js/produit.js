// import de la fonction addClass pour l'ajout de class
import {addClass} from './modules/functions.js';
// url de l'api (Application Programming Interface)
const urlCamId = "http://localhost:3000/api/cameras/";
// dans le fetch on utilise l'URL récupérer + la fonction qui au final affiche l'ID 
fetch(urlCamId + recupId()).then(response=>{ // exemple => http://localhost:3000/api/cameras/b52IJideldp98dej
    response.json().then(data=>{
        showElt(data);
        choiseLenses(data);
        saveOnLS(data)
    })
})
// récupération du contener de la page produit
let contentPageProduit = document.getElementById('content-produit');
//création des élément HTML
let elt = document.createElement('DIV'),
    name = document.createElement('H3'),
    imgElt = document.createElement('IMG'),
    price = document.createElement('P'),
    description = document.createElement('P'),
    select = document.createElement('SELECT'),
    inputOnProduct = document.createElement("INPUT"),
    button = document.createElement("INPUT"), 
    choixVide = new Option(),
    messStatus = document.createElement("P");

// ajout des classe a tout le contenu de la page
addClass(contentPageProduit, "contener", "contener-fluid");
addClass(elt ,"camera-produit",'col', "col-sm-12", "col-md-3", "bg-light");
addClass(imgElt ,'img-produit-page');
addClass(description, "description-produit");
addClass(price, "price-produit", "bg-dark");
addClass(name, "name-produit");
addClass(select, 'select-lenses');
addClass(button, 'col', 'button-submit', "bg-dark","btn","btn-dark");
addClass(messStatus, 'col', "text-danger", 'message-status');
addClass(inputOnProduct, 'col', "bg-dark","input-number","btn-dark");
 // initialisations des attributs
inputOnProduct.setAttribute('type', "number");
inputOnProduct.setAttribute('placeholder', "*Entrez un nombre");
inputOnProduct.setAttribute('min','1');
button.setAttribute("type", 'submit');

// créations des variables utiles au sites
let messAlert,
    listOptions = [],
    lenses,
    choix,
    panier,
    lPanier,
    eltObjet,
    btnProduit,
    isPresent,
    isValid = false;

// fonction permetant de recupéré l'ID actuelle qui a était partagé dans l'URL de la page produit.html
function recupId(){
    const urlActuel = window.location.search.slice(4);
    return urlActuel;
}
//fonction qui va afficher l'element demandé sur la page
function showElt(element){
    
    // initialisation du prix / description/ nom et img
    price.innerHTML = "<strong>" + (element.price/100).toFixed(2) + " €</strong>";
    description.innerHTML = "<em>" + element.description + "</em>";
    name.textContent = element.name;
    imgElt.src = element.imageUrl;
    
    // ajout des élément a la page 
    contentPageProduit.appendChild(select)
    elt.appendChild(name)
    elt.appendChild(imgElt);
    elt.appendChild(price);
    elt.appendChild(description);
    button.value = 'ajouter au panier';
    contentPageProduit.appendChild(inputOnProduct);
    contentPageProduit.appendChild(button);
    contentPageProduit.appendChild(elt);   
    contentPageProduit.appendChild(messStatus)
    
}
function choiseLenses(element){
    choixVide.textContent ='Veuillez choisir une taille de lentilles';
    lenses = element.lenses;
    select.appendChild(choixVide)
    lenses.forEach(lentilles => {
        choix = new Option();
        choix.textContent = lentilles;
        listOptions.push(choix)
        select.appendChild(choix)
    })
}
function saveOnLS(element) {
    button.addEventListener('click', function (){
        lPanier = JSON.parse(localStorage.getItem('panier'));
        isPresent = false;
        panier = [];
        eltObjet = {
            image: element.imageUrl,
            nom: element.name,
            prix: element.price,
            lenses: select.value,
            id: element._id,
            nombre: parseInt(inputOnProduct.value),
        }
        
        if(lPanier){
            lPanier.forEach(element=>{
                if(element.id==recupId() && element.lenses == select.value){
                    isPresent=true;
                    if (inputOnProduct.value>=1) {
                        element.nombre = element.nombre + parseInt(inputOnProduct.value);
                    }
                }
            })
            panier = lPanier;
        }
        if(!isPresent){
            panier.push(eltObjet);
        }
        if (inputOnProduct.value <0 && select.value != choixVide.value){
            messStatus.classList.remove('text-success');
            messStatus.classList.add('text-danger');
            messStatus.textContent = "Il n'est pas possible d'ajouter un nombre négatif d'éléments au panier"; 

            isValid = false;
        }else if (inputOnProduct.value == 0 && select.value != choixVide.value){
            isValid = false;
            
            messStatus.classList.remove('text-success');
            
            messStatus.classList.add('text-danger');
            messStatus.textContent = "Il n'est pas possible d'ajouter aucun élément au panier"; 
        }
        else if (inputOnProduct.value >= 1 && select.value != choixVide.value){
            messStatus.classList.remove('text-danger');
            messStatus.classList.add('text-success');
            messStatus.textContent = `vous avez ajouter ${inputOnProduct.value} appareils photo`;
            isValid = true;
        }
        if(select.value == choixVide.value){
            messAlert = 'Veuillez choisir une taille lentilles';
            alert(messAlert);
        }else if (isValid){
            localStorage.setItem('panier', JSON.stringify(panier));
            
        }
        
    })
}
// recuperation du btn de la nav-bar pour suprimer l'évent de base
btnProduit = document.getElementById('btn-produit');
btnProduit.addEventListener('click', function(e){
    e.preventDefault();
})
