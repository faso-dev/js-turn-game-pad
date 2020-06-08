/**
 * Class Personnage
 * @copyright 2020 | All rights reserved
 * @author faso-dev
 */
class Personnage {
    id;
    nom;
    force;
    image;
    force_de_frappe;
    estEnDefence;
    /**
     *
     * @param {Number} id
     * @param {String} nom
     * @param {Number} force
     * @param {String} image
     * @param {Number} force_de_frappe
     */
    constructor(id, nom, force, image, force_de_frappe = 10) {
        this.id = id;
        this.nom = nom;
        this.force = force;
        this.image = image;
        this.force_de_frappe = force_de_frappe;
        this.position = {
            x: null,
            y: null
        }
        this.arme = null
        this.estEnDefence = null
    }

    /**
     *
     * @param {Boolean} etat
     */
    set estEnDefence(etat) {
        this.estEnDefence = etat
    }

    get estEnDefence(){
        return this.estEnDefence
    }

    /**
     * Renvoie l'identifiant du joueur
     * @returns {Number} l'identifiant du joueur
     */
    get id() {
        return this.id;
    }

    /**
     * Renvoie le nom du joueur
     * @returns {String} le nom du joueur
     */
    get nom() {
        return this.nom;
    }

    /**
     * Renvoie la force du joueur
     * @returns {Number} la force actuelle du joueur
     */
    get force() {
        return this.force;
    }

    /**
     * Renvoie l'image du personnage
     * @returns {String} l'image du personnage
     */
    get image() {
        return this.image;
    }

    get force_de_frappe() {
        return this.force_de_frappe;
    }

    /**
     * Met à jour la force du joueur
     * @param {Number} value
     */
    set force_de_frappe(value) {
        this.force_de_frappe = value;
    }

    /**
     * Met à jour la force du joueur en lui affligeant le dégât
     * @param {Number} degat le dégât à affliger au joueur
     */
    miseAJourDeLaForce(degat){
        if (this.estEnDefence){
            degat /= 2
        }
        if (degat >= this.force){
            this.force = 0
        }else {
            this.force -= degat
        }
    }

    /**
     * Permet de se défendre
     * @param {Boolean} statut
     */
    defendre(statut){
        this.estEnDefence = statut
    }

    /**
     * Met à jour la position du joueur sur la carte
     * @param {Number} ligne
     * @param {Number} colonne
     */
    miseAJourPositionCoordonnees(ligne, colonne){
        this.position.x = ligne
        this.position.y = colonne
    }

}