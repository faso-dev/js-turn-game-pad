/**
 * Class Arme
 * @copyright 2020 | All rights reserved
 * @author faso-dev
 */
class Arme {
    id;
    nom;
    degat;
    image;

    /**
     * Constructeur de la classe Arme
     * @param {Number} id l'identifiant de l'arme
     * @param {String} nom le nom de l'arme
     * @param {Number} degat les dégats que peut infliger l'arme
     * @param {String} image l'image de l'arme
     */
    constructor(id, nom, degat, image) {
        this.id = id;
        this.nom = nom;
        this.degat = degat;
        this.image = image;
    }

    /**
     * Renvoie l'identifiant de l'arme
     * @returns {Number} l'identifiant de l'arme
     */
    get id(){
        return this.id
    }

    /**
     * Renvoie le nom de l'arme
     * @returns {String} le nom de l'arme
     */
    get nom(){
        return this.nom
    }

    /**
     * Renvoie le dégât infligé par l'arme
     * @returns {Number} le dégat infligé par l'arme
     */
    get degat(){
        return this.degat
    }

    /**
     * Renvoie l'image de l'arme
     * @returns {String} l'image de l'arme
     */
    get image(){
        return this.image
    }
}