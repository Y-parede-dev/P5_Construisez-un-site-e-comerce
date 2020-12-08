import {addClass} from './modules/functions.js';
// récuperation des elements html
let panier = document.getElementById('panier');

// création de plusieurs liste qui contiendrons les element du panier
let listForId = document.createElement('UL'),
    listForProduit = document.createElement('UL'),
    listForImage = document.createElement('UL'),
    listForLenses = document.createElement('UL'),
    listForPrice = document.createElement('UL'),
    listForNombre = document.createElement('UL');

    let imageEltList,
        imageElt,
        produitElt,
        idElt,
        lensesElt,
        priceElt,
        nombreElt;

// ajout des listes sur la page panier
panier.appendChild(listForImage);
panier.appendChild(listForId);
panier.appendChild(listForProduit);
panier.appendChild(listForLenses);
panier.appendChild(listForNombre);
panier.appendChild(listForPrice);

// création d'un tableu qui contient toutes les listes pour ajouter les classes plus rapidement
let panierList = [
    listForId, 
    listForProduit, 
    listForImage, 
    listForLenses, 
    listForPrice, 
    listForNombre
];
// variables utiles
let recupObjet,
    recupTableau,
    arrayPrice,
    arrayNumber;
// ajout des classes sur les listes
panierList.forEach(element => {
    addClass(element, 'row', "list");
});
listForId.id = 'id-list-panier';
// initialisation des titres des listes
listForId.textContent= 'id';
listForImage.textContent = 'image';
listForImage.id = 'list-image-elt';
listForLenses.textContent =  'lentille';
listForNombre.textContent = "nombre";
listForPrice.textContent = 'prix';
listForPrice.id = 'list-price-elt';
listForProduit.textContent = 'produit';

function showCart(){
    if(localStorage.panier){
        recupTableau = JSON.parse(localStorage.panier);
        arrayPrice = [];
        arrayNumber = [];
    
        for(let i =0;i<recupTableau.length;i++){
            recupObjet = recupTableau[i];
            // creation des elements qui rempliront les listes
            imageEltList = document.createElement('LI');
            imageElt = document.createElement('IMG');
            produitElt = document.createElement('LI');
            idElt = document.createElement('LI');
            lensesElt = document.createElement('LI');
            priceElt = document.createElement('LI');
            nombreElt = document.createElement('LI');
    
            let inputNumberCart = document.createElement('INPUT'),
                btnDeleteElt = document.createElement('BUTTON');
            
            // initialisation des elements
            idElt.textContent = recupObjet.id;
            listForId.appendChild(idElt);
            lensesElt.textContent = recupObjet.lenses;
            listForLenses.appendChild(lensesElt);
            
            imageElt.src = recupObjet.image;
            imageElt.id = 'img-inside-list';
            imageElt.alt = "image de l'article";
            
            imageEltList.appendChild(imageElt);
            listForImage.appendChild(imageEltList);
            
            inputNumberCart.value = recupObjet.nombre;
            
            inputNumberCart.setAttribute("type", "number");
            
            imageElt.addEventListener('click', ()=>{
                window.location.href = "./produit.html?id="+recupObjet.id;
            })
            
            // appel au fonctions
            addOrRemoveEltOnCart();
            deleteEltCart();
            // ajoute le text-content et ajoute element au parent
            addAndAppend(produitElt, recupObjet.nom, listForProduit);
            addAndAppend(priceElt, (recupObjet.prix/100).toFixed(2) + " €", listForPrice);
            addAndAppend(nombreElt, "", listForNombre);
            // ajout des classes
            addClass(imageElt,"image-panier");
            addClass(priceElt,'prix-element');
            addClass(inputNumberCart,'form-control','input-number-cart');
            // initialisation du prix total
            let priceEltTotal = ((recupObjet.prix * recupObjet.nombre)/100) ;
            arrayPrice.push(priceEltTotal);
    
            arrayNumber.push(recupObjet.nombre);
            nombreElt.appendChild(inputNumberCart);
            nombreElt.appendChild(btnDeleteElt);
            // fonction qui ajoute ou supprime un élément du panier selon le vouloir de l'utilisateur
            function addOrRemoveEltOnCart(){
                inputNumberCart.addEventListener('blur', function(){
            
                    recupTableau[i].nombre = inputNumberCart.value
                    if(inputNumberCart.value == 0){
                        recupTableau.splice(i,1)
                    }
                    window.location.reload();
                    if(inputNumberCart.value<0 ) {
                        alert('Les nombres négatifs ne sonts pas pris en charges');
                    }else{
                        
                        localStorage.setItem('panier', JSON.stringify(recupTableau));
                    };
                }); 
            };
            // fonction qui supprime l'élément en question (il supprime le nombre total le la)
            function deleteEltCart(){
                btnDeleteElt.id = 'btn-delete-elt';
                btnDeleteElt.textContent = "🗑";
    
                btnDeleteElt.addEventListener('click', function(){
                recupTableau.splice(i,1);
                localStorage.setItem('panier', JSON.stringify(recupTableau));
                window.location.reload();
                recupObjet.nombre = 0;
                recupTableau.push(recupObjet);
                });
            };
            
        };
        // arrayNumber va me servir a afficher le nombre total d'élément dans le panier
        if(arrayNumber.length >= 1){
            localStorage.totalPanier = arrayNumber.reduce(
                (accumulateur, valeurCourante) => accumulateur + valeurCourante);
            let priceTotal = document.getElementById('price');
            let priceEltTotalP = document.createElement('P');
            priceEltTotalP.textContent = arrayPrice.reduce(
                (accumulateur, valeurCourante) => (accumulateur + valeurCourante)) + " €";
        
            priceTotal.appendChild(priceEltTotalP);
            localStorage.prixTotal = arrayPrice.reduce(
                (accumulateur, valeurCourante) => accumulateur + valeurCourante) + " €";
        
        }else{
            localStorage.clear();
        };
        
    };
};
showCart();
/**
 * 
 * @param {Element} elt Nom de la variable qui contient l'element HTML 
 * @param {key} key La cléf dans le local storage (peut etre utiliser pour un objet non stocker sur le LocalStorage/SessionStorage)
 * @param {NodePareent} parent Nom du noeud parent pour apliquer le append child
 */
function addAndAppend(elt, key, parent){
    elt.textContent = key;
    parent.appendChild(elt);
};   

//-------------------------------FORMULAIRE----------------------------------\\
let formulaire = document.querySelector('form');

let nom = document.createElement('LABEL');
let nomInput = document.createElement('INPUT');

let prenom = document.createElement('LABEL');
let prenomInput = document.createElement('INPUT');

let adresse = document.createElement('LABEL');
let adresseInput = document.createElement('INPUT');

let ville = document.createElement('LABEL');
let villeInput = document.createElement('INPUT');

let adresseMail = document.createElement('LABEL');
let adresseMailInput = document.createElement('INPUT');

let submitButton = document.createElement('BUTTON');
submitButton.textContent = "envoyer";

adresseMailInput.id = "email-client";

// création des objets contact et post & création du tableau post
let contact;
let products = [];
const post = {};
/**
 * initialise un label + valeur + attribut du label // initialise également un input + valeur + atribut + type  
 * @param {label} label besoin du nom de la variable qui contient un label soit cree soit recuperer avec un document.getElement.Id('id') <= par ex
 * @param {value} value value du label
 * @param {for} atribut1 atribut for pour le label 
 * @param {input} input nom de linput soit recupere soit cree
 * @param {value} value2 value de l'input
 * @param {placeHolder} atribut2 valeur de lattribut du place Holder de l'input
 * @param {type} type type de l'input
 */

function addTextAndAttribute(label, value, atribut1, input, value2, atribut2, type){
    label.textContent = value;
    label.setAttribute('for', atribut1);
    input.name = value2;
    input.setAttribute('placeHolder', atribut2)
    input.setAttribute('required', true);
    input.setAttribute('type', type);
    formulaire.appendChild(label);
    formulaire.appendChild(input)
    formulaire.appendChild(submitButton)
    addClass(input,"form-control");
    addClass(submitButton,"btn","btn-primary", "btn-submit");
};

// function isValid sert a la validation de l'adress email graçe a une reGex
function isValid(value){
    let reGex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return reGex.test(value);
};
function checkAndPost(){
    submitButton.addEventListener('click', function(e){
        e.preventDefault();
        let postValidate = false;
        // on vérifie si panier existe dans le localStorage
        if(localStorage.panier){
            //si il existe on recherche l'id pour l'ajouter au tableau products
            recupTableau.forEach(elt =>{
                products.push(elt.id)
            })
            // on verifie que les information sont valid(pour les type des attributs on étais crée en amont)
            if(prenomInput.value.length > 3 &&
                nomInput.value.length > 3 &&
                adresseInput.value.length > 8 &&
                villeInput.value.length > 3 &&
                isValid(adresseMailInput.value)){
                    // si elles sont valide on passe postValidate sur true et nous créons l'objet contact
                    postValidate = true;
                    contact = {
                        firstName : prenomInput.value,
                        lastName : nomInput.value,
                        address: adresseInput.value,
                        city : villeInput.value,
                        email : adresseMailInput.value
                    }
                    // initialison l'objet post
                    post.contact = contact;
                    post.products = products;
                    console.log(post)
            } else{
                //si les informations saisies ne sont pas valide retourne une alerte
                postValidate = false;
                alert('Veuillez vérifier vos informations')
            };
            // fonction pour recupere l'order id 
            function recupOrderId(response){
                // nous passons un arguments
                localStorage.orderId = response.orderId; // ici je  recuperer orderId de l'appel fetch un peut plus bas
                
                // ici je vide les element du LS  qui ne me servent plus
                localStorage.removeItem('panier');
                localStorage.removeItem('totalPanier');
                window.location.href = './recap.html';
                
            };
            // si post validate est sur true et que localStorage.panier existe
            if (postValidate && localStorage.panier){
                const url = 'http://localhost:3000/api/cameras/'; 
                //requete fetch avec methode post
                fetch(url + 'order', {
                    method: "POST",
                    body: JSON.stringify(post),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    
                .then(response => 
                    response.json())
                .then(response => 
                    recupOrderId(response)) //utilisation de la fonction recupOrderId
                .catch(err=>console.error(err))
            };
        } else {
            alert('Votre panier et vide');
        };
    });    
};
// utilisation des fonctions du formulaire
addTextAndAttribute(nom,'Nom','nom',nomInput,'nom','*Nom','text');
addTextAndAttribute(prenom,'Prenom','prenom',prenomInput,'prenom','*Prenom', "text");
addTextAndAttribute(adresse,'Adresse','adresse',adresseInput,'adresse','*Adresse', "text");
addTextAndAttribute(ville,'Ville','ville',villeInput,'ville','*Ville', "text");
addTextAndAttribute(adresseMail,'Adresse @mail','adresseMail',adresseMailInput,'adresseMail','*Adresse @mail', "email");
checkAndPost();
