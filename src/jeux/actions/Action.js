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
     *
     * @param {Number} id
     * @returns {Personnage}
     */
    get(id){
        return this.joueurs.find( j => j.id === id)
    }
    /**
     * Permet au joueur d'attaquer
     * @param {Number} sourceIndex
     * @param {Number} cibleIndex
     */
    attaquer(sourceIndex, cibleIndex){
        this.joueurs[cibleIndex].miseAJourDeLaForce(this.joueurs[sourceIndex].force_de_frappe)
        console.log('La force de %s est  : %d et la force de %s est : %d', this.joueurs[cibleIndex].nom, this.joueurs[cibleIndex].force, this.joueurs[sourceIndex].nom, this.joueurs[sourceIndex].force)
    }

    /**
     * Permet au joueur de se défendre
     * @param {Personnage} joueur
     */
    defendre(joueur){

    }
}