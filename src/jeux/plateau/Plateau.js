const BLOCK = 'BLOCK'
const ARME = 'ARME'
const JOUEUR = 'ARME'

class Plateau {
    armes;
    joueurs;

    /**
     * Constructeur de la classe plateau
     * @param {Array} armes
     * @param {Array} joueurs
     * @param {Number} nb_grille le nombre de grille du plateau
     */
    constructor(armes, joueurs, nb_grille = 10) {
        this.armes = armes;
        this.joueurs = joueurs;
        //Le nombre total de grille
        this.nb_grille = nb_grille
        //Surface du plateau
        this.surface = []
        //Le trour actuel dans le plateau
        this.joueurActuel = null
    }

    init() {
        for (let ligne = 0; ligne < this.nb_grille; ligne++) {
            this.surface[ligne] = []
            for (let colonne = 0; colonne <= this.nb_grille - 1; colonne++) {
                $("#conteneur-de-jeux").append(`<div id="grid_${ligne}_${colonne}"  class="grid"></div>`);
                this.surface[ligne][colonne] = {
                    element: null,
                    obstacle: null,
                    joueur: null,
                    arme: {
                        id: null,
                        nom: null,
                        image: null,
                        degat : null
                    },
                    deplacerPour: null
                }
            }
        }
        $(".grid").width(760 / this.nb_grille);
        $(".grid").height(760 / this.nb_grille);
        this.joueurActuel = 'Joeur 1'
        console.log('call init')
    }

    /**
     * Place un obstacle sur la surface du plateau
     * @param {Number} nb_obstacle le nombre d'obstacle à afficher sur le plateau
     * @param {string} obstacle_image le chemin vers l'image de l'obstacle à afficher
     */
    placerUnObstacle(nb_obstacle = 6, obstacle_image = './assets/images/obstacles/obstacle.png') {
        for (let i = 0; i < nb_obstacle; i++) {
            //On place l'obstacle sur le plateau
            this.placer(obstacle_image, BLOCK)
        }
    }

    /**
     * Ajoute le css permettant de définir les images des obstacles
     * @param {Number} ligne la ligne sur laquelle afficher l'obstacle
     * @param {Number} colonne la colonne sur laquelle afficher l'obstacle
     * @param {String} obstacle_image l'image de l'obstacle
     */
    setImage(ligne, colonne, obstacle_image) {
        $(document).find(`#grid_${ligne}_${colonne}`).css({
            "background": `url('${obstacle_image}') no-repeat`,
            "background-size": "contain",
            "width": `${760 / this.nb_grille}px`,
            "height": `${760 / this.nb_grille}px`
        });
    }

    /**
     * Place les différentes armes sur le plateau
     */
    placerLesArmes() {
        this.armes.forEach(arme => {
            console.log(arme)
            this.placer(arme.image, ARME, arme)
        })
    }

    /**
     * Place un élément sur le plateau
     * @param {String} image
     * @param {String} type
     * @param {Object} arme
     * @param {Object} joeur
     */
    placer(image, type, arme = null, joeur = null) {
        switch (type) {
            case BLOCK: {
                let {ligne, colonne} = generator(this.nb_grille - 1)
                if (this.surface[ligne][colonne].element !== true) {
                    this.surface[ligne][colonne].obstacle = true;
                    this.surface[ligne][colonne].element = true;
                    this.setImage(ligne, colonne, image);
                } else {
                    this.placer(image, type)
                }
            }
                break;
            case ARME: {
                let {ligne, colonne} = generator(this.nb_grille - 1)
                if (this.surface[ligne][colonne].element !== true) {
                    this.surface[ligne][colonne].arme = arme;
                    this.surface[ligne][colonne].element = true;
                    this.setImage(ligne, colonne, arme.image);
                } else {
                    this.placer(image, ARME, arme)
                }
            }
                break;
        }

    }

    afficher() {
        console.log(this.surface)
    }
}