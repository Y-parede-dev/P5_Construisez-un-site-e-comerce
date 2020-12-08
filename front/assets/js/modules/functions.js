// creation fonction pour ajouter classe plus rapidement et avec un nombre d'argument indefinie
/**
 * 
 * @param {var} name  Nom de la variable sui contient l'element HTML a ajouter les classe
 * @param {className} className nom de la class
 * @param  {...any} otherClass possibiliter d'ajouter un nombre indéfinit de classes
 */

function addClass(name, className, ...otherClass){
    name.classList.add(className, ...otherClass);
};
export {addClass};


