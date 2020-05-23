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
    /**
     *
     * @param {Number} id
     * @param {String} nom
     * @param {Number} force
     * @param {String} image
     */
    constructor(id, nom, force, image) {
        this.id = id;
        this.nom = nom;
        this.force = force;
        this.image = image;
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

    /**
     * Met à jour la force du joueur en lui affligeant le dégât
     * @param {Number} degat le dégât à affliger au joueur
     */
    miseAjourDeLaForce(degat){
        if (degat >= this.force){
            this.force = 0
        }else {
            this.force -= degat
        }
    }
}