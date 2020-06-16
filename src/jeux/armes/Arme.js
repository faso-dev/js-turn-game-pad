/**
 * Ce bout de code est une propriété de Jerôme S.C Daniel Onadja(faso-dev)
 * @author Jerôme S.C Daniel Onadja <jeromeonadja28@gmail.com>
 * @copyright 2020 | Tous droit reservés
 * @licence MIT propulsé par <faso-dev> https://faso-dev.herokuapp.com
 */

/**
 * Class Arme pour créer les armes pour le combat
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
        this.position = {
            x: null,
            y: null
        };
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

    /**
     * Les nouvelles cordonnées de l'arme sur le plateau
     * @param {Number} ligne la cordonnée en x(la ligne)
     * @param {Number} colonne la cordonnee en y(la colonne)
     */
    miseAJourDeLaPosition(ligne, colonne){
        this.position.x = ligne
        this.position.y = colonne
    }
}