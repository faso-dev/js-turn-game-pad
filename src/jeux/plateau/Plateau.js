const BLOCK = 'BLOCK'
const ARME = 'ARME'
const JOUEUR = 'JOUEUR'

class Plateau {
    armes;
    joueurs;

    /**
     * Constructeur de la classe plateau
     * @param {Arme[]} armes
     * @param {Personnage[]} joueurs
     * @param {Number} nb_grille le nombre de grille du plateau
     */
    constructor(armes, joueurs, nb_grille = 10) {
        this.armes = armes;
        this.joueurs = joueurs;
        //Le nombre total de grille
        this.nb_grille = nb_grille
        //Surface du plateau
        this.surface = []
        this.joueur_actuel = null
    }

    init() {
        for (let ligne = 0; ligne < this.nb_grille; ligne++) {
            this.surface[ligne] = []
            for (let colonne = 0; colonne <= this.nb_grille - 1; colonne++) {
                $("#conteneur-de-jeux").append(`<div data-ligne="${ligne}" data-colonne="${colonne}" id="grid_${ligne}_${colonne}"  class="grid"></div>`);
                this.surface[ligne][colonne] = {
                    element: null,
                    obstacle: null,
                    joueur: null,
                    existUnJoueur: null,
                    arme: {
                        id: null,
                        nom: null,
                        image: null,
                        degat: null
                    },
                    aUneArme : null,
                    peutSeDeplacer: null
                }
            }
        }
        this.joueur_actuel = this.joueurs[Math.floor(Math.random() * this.joueurs.length)];
        $(".grid").width(760 / this.nb_grille);
        $(".grid").height(760 / this.nb_grille);
    }

    /**
     * Place un obstacle sur la surface du plateau
     * @param {Number} nb_obstacle le nombre d'obstacle à afficher sur le plateau
     * @param {string} obstacle_image le chemin vers l'image de l'obstacle à afficher
     */
    placerUnObstacle(nb_obstacle = 6, obstacle_image = './assets/images/obstacles/obstacle.png') {
        for (let i = 0; i < nb_obstacle; i++) {
            //On place l'obstacle sur le plateau
            this.placer(BLOCK,obstacle_image,)
        }
    }

    /**
     * Place les différentes armes sur le plateau
     */
    placerLesArmes() {
        this.armes.forEach(arme => {
            this.placer(ARME,arme.image, arme)
        })
    }

    /**
     * Place les différentes joueur sur le plateau
     */
    placerLesJoueurs() {
        this.joueurs.forEach(joueur => {
            this.placer(JOUEUR, joueur.image,null,joueur)
        })
    }

    /**
     * Ajoute le css permettant de définir les images des obstacles
     * @param {Number} ligne la ligne sur laquelle afficher l'obstacle
     * @param {Number} colonne la colonne sur laquelle afficher l'obstacle
     * @param {String} image l'image de l'obstacle
     */
    setImage(ligne, colonne, image) {
        $(`#grid_${ligne}_${colonne}`).css({
            "background": `url('${image}') no-repeat`,
            "background-size": "contain",
            "width": `${760 / this.nb_grille}px`,
            "height": `${760 / this.nb_grille}px`
        });
        $(`#grid_${ligne}_${colonne}`).removeClass('ombre-arme');
    }

    /**
     * Permet de mettre à jour la position du joueur lorsqu'il prend une arme
     * @param {Number} ligne
     * @param {Number} colonne
     * @param {Object} joueur
     */
    prendreUneArme(ligne, colonne, joueur){
        if (this.surface[ligne][colonne].arme) {
            this.surface[ligne][colonne].existUnJoueur = true;
            this.surface[ligne][colonne].joueur = joueur;
            this.miseAJourJoueurPosition(joueur,ligne,colonne)
        }
    }

    /**
     *
     * @param {Number} ligne
     * @param {Number} colonne
     * @param {Personnage} joueur
     */
    miseAJourDesDonnesDuJoueur(ligne, colonne, joueur){
        for (let arme in this.armes) {
            if (arme === this.surface[ligne][colonne].arme) {
                this.joueurs.map( j => {
                    if (j === joueur){
                        j.force_de_frappe = arme.degat
                    }
                })
                this.miseAJourDeLInterfaceDUnJoueur(joueur, arme)
                break;
            }
        }
    }

    /**
     *
     * @param {Personnage} joueur le joueur à mettre les infos sur le graphique
     * @param {Arme} arme la nouvelle arme
     */
    miseAJourDeLInterfaceDUnJoueur(joueur, arme){
        this.setJoueurNouvelleArme(`${joueur.nom}_${joueur.id}`, arme)
    }

    /**
     * Rend les nouvelles informations du joueur
     * @param {String} joueur_selector
     * @param {Arme} arme
     */
    setJoueurNouvelleArme(joueur_selector,arme){
        $(`.${joueur_selector}`).text(`${arme.degat}`);
        $(`.${joueur_selector}`).css({
            "background" : `url('${arme.image}') no-repeat`,
            "background-size" : "contain",
            "width" : "200px",
            "height" : "200px",
        });
    }


    /**
     * Place un élément sur le plateau
     * @param {String} image
     * @param {String} type
     * @param {Arme} arme
     * @param {Personnage} joueur
     * @param {Number} ligne
     * @param {Number} colonne
     * @param {Boolean} remplacement
     */
    placer(type, image = null, arme = null, joueur = null, ligne = null, colonne = null, remplacement = false) {
        switch (type) {
            case BLOCK: {
                let {ligne, colonne} = generator(this.nb_grille - 1)
                if (this.surface[ligne][colonne].element !== true) {
                    this.surface[ligne][colonne].obstacle = true;
                    this.surface[ligne][colonne].element = true;
                    this.setImage(ligne, colonne, image);
                } else {
                    this.placer(type,image)
                }
            }
                break;
            case ARME: {
                if (null === ligne && null === colonne){
                    let {ligne : l, colonne : c} = generator(this.nb_grille - 1)
                    ligne = l
                    colonne = c
                }

                //Quand l'arme est nulle, cela signifit que le joueur vient de prendre
                //Sa première arme, dans ce cas on libère la zône sur laquelle l'arme était
                //en mettant à null toutes les coordonnées
                if (this.surface[ligne][colonne].element === true && null === arme) {
                    this.surface[ligne][colonne].arme = null;
                    this.surface[ligne][colonne].element = null;
                    this.surface[ligne][colonne].aUneArme = null;

                    //Sinon si l'arme n'est pas nulle et que remplacement égale à vraie
                    //C'est que le joueur veut remplacer son arme courante par une nouvelle
                    //Dans ce cas, on replace l'ancienne arme à la place de l'arme actuelle prise
                    //par le joueur
                }else if (remplacement && null !== arme) {
                    this.surface[ligne][colonne].arme = arme;
                    this.surface[ligne][colonne].element = true;
                    this.surface[ligne][colonne].aUneArme = true;
                        this.armes.map(a => {
                            if (a.id === arme.id) {
                                a.miseAJourDeLaPosition(ligne, colonne)
                            }
                        })
                        this.setImage(ligne, colonne, arme.image);
                        //Sinon nous somme dans le cas d'une initialisation
                        // des armes sur la carte
                } else if(this.surface[ligne][colonne].element !== true && arme !== null) {
                    this.surface[ligne][colonne].arme = arme;
                    this.surface[ligne][colonne].element = true;
                    this.surface[ligne][colonne].aUneArme = true;
                    this.armes.map(a => {
                        if (a.id === arme.id) {
                            a.miseAJourDeLaPosition(ligne, colonne)
                        }
                    })
                    this.setImage(ligne, colonne, arme.image);
                }else {
                    this.placer(type, arme.image, arme)
                }
            }
                break;
            case JOUEUR: {
                if (null === ligne && colonne === null){
                    let {ligne : l, colonne : c} = generator(this.nb_grille - 1)
                    ligne = l
                    colonne = c
                }
                if (
                    (ligne < this.nb_grille - 1 && this.surface[ligne + 1][colonne].existUnJoueur === true) ||
                    (ligne > 0 && this.surface[ligne - 1][colonne].existUnJoueur === true)
                ) {
                    this.placer( type, joueur.image,null, joueur)
                } else if (
                    (colonne < this.nb_grille - 1 && this.surface[ligne][colonne + 1].existUnJoueur === true) ||
                    (colonne > 0 && this.surface[ligne][colonne - 1].existUnJoueur === true)
                ) {
                    this.placer( type, joueur.image,null, joueur)
                } else {
                    if (this.surface[ligne][colonne].element !== true) {
                        this.surface[ligne][colonne].existUnJoueur = true;
                        this.surface[ligne][colonne].element = true;
                        this.surface[ligne][colonne].joueur = joueur;
                        this.miseAJourJoueurPosition(joueur, ligne, colonne);
                        $(`#grid_${ligne}_${colonne}`).css({
                            "background-color": "",
                            "box-shadow": ""
                        });
                        this.setImage(ligne, colonne, joueur.image);
                        this.miseAJourDesDonnesDuJoueur(ligne, colonne, joueur);
                    }else {
                        this.placer( type, joueur.image,null, joueur)
                    }
                }
            }
        }

    }

    /**
     *
     * @param {Object} joueur le joueur à mettre à jour la position
     * @param {Number} ligne la ligne du joueur sur le plateau
     * @param {Number} colonne la colonne du joueur sur le plateau
     */
    miseAJourJoueurPosition(joueur, ligne, colonne) {
        this.joueurs.map(j => {
            if (j.id === joueur.id) {
                //Mise à jour de la position du joueur sur le plateau
                j.miseAJourDeLaPosition(ligne, colonne)
            }
        })
    }

    /**
     * Efface les anciennes coordonnées du joueur de la position actuelle
     * lorsqu'il se déplace vers une autre case
     */
    effacerPositionJoueur(){
        let {x: ligne, y :colonne} = this.joueur_actuel.position
        this.surface[ligne][colonne] = {
            element: null,
            obstacle: null,
            joueur: null,
            existUnJoueur: null,
            arme: {
                id: null,
                nom: null,
                image: null,
                degat: null
            },
            peutSeDeplacer: null
        }
        //On supprime l'image du joueur de cette case
        $(`#grid_${ligne}_${colonne}`).css("background", "");
    }

    debuguer() {
        console.log(this.surface)
        console.log(this.armes)
        console.log(this.joueurs)
        console.log(this.joueur_actuel)
    }


}