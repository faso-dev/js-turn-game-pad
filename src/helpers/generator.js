/**
 * Génère une ligne ou une colonne aléatoire
 * @param {Number} nb_ligne nombre de ligne d'une grille
 * @returns {{ligne: number, colonne: number}} la ligne ou la colonne
 */
function generator(nb_ligne) {
    let ligne =  Math.floor(Math.random() * (nb_ligne + 1));
    let colonne =  Math.floor(Math.random() * (nb_ligne + 1));
    return {
        ligne,
        colonne,
    }
}