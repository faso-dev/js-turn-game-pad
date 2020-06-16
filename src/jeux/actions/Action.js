/**
 * Ce bout de code est une propriété de Jerôme S.C Daniel Onadja(faso-dev)
 * @author Jerôme S.C Daniel Onadja <jeromeonadja28@gmail.com>
 * @copyright 2020 | Tous droit reservés
 * @licence MIT propulsé par <faso-dev> https://faso-dev.herokuapp.com
 */

/**
 * Classe spécialisée pour le combat
 */
class Action {
    joueurs
    /**
     *
     * @param {Array} joueurs
     */
    constructor(joueurs) {
        this.joueurs = joueurs
    }

    /**
     * Permet au joueur d'attaquer
     * @param {Number} sourceIndex
     * @param {Number} cibleIndex
     */
    attaquer(sourceIndex, cibleIndex){
        this.joueurs[cibleIndex].miseAJourDeLaForce(this.joueurs[sourceIndex].force_de_frappe)
    }

}