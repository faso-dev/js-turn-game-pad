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
                    aUneArme: null,
                    peutSeDeplacer: null
                }
            }
        }
        this.joueur_actuel = this.joueurs[Math.floor(Math.random() * this.joueurs.length)];
        $(".grid").width(760 / this.nb_grille)
            .height(760 / this.nb_grille);
        this.informationsInitialsJoueurs();
    }


    informationsInitialsJoueurs() {
        $('#joueur-un .joueur-nom').text(this.joueur_actuel.nom)
        $('#joueur-un .joueur-image').css({
            'background': `url('${this.joueur_actuel.image}') no-repeat`,
            "background-size": "contain",
            "width": `${280}px`,
            "height": `${280}px`
        })
        $('#joueur-un').data('joueur', this.joueur_actuel.id)
                        .addClass(`data-${this.joueur_actuel.id}`)
        $('#joueur-un .joueur-force')
            .text(this.joueur_actuel.force)
            .attr('id', this.joueur_actuel.id)
        $('#joueur-un .joueur-force-frappe')
            .text(this.joueur_actuel.force_de_frappe)

        let nexJoueur = this.joueurs.find(j => j.id !== this.joueur_actuel.id)
        $('#joueur-deux .joueur-nom')
            .text(nexJoueur.nom)
        $('#joueur-deux .joueur-image')
            .css({
            'background': `url('${nexJoueur.image}') no-repeat`,
            "background-size": "contain",
            "width": `${280}px`,
            "height": `${280}px`
        })
        $('#joueur-deux')
            .data('joueur', nexJoueur.id)
            .addClass(`data-${nexJoueur.id}`)
        $('#joueur-deux .joueur-force')
            .text(nexJoueur.force)
            .attr('id', nexJoueur.id)
        $('#joueur-deux .joueur-force-frappe').text(nexJoueur.force_de_frappe)
    }

    /**
     * Place un obstacle sur la surface du plateau
     * @param {Number} nb_obstacle le nombre d'obstacle à afficher sur le plateau
     * @param {string} obstacle_image le chemin vers l'image de l'obstacle à afficher
     */
    placerUnObstacle(nb_obstacle = 6, obstacle_image = './assets/images/obstacles/obstacle.png') {
        for (let i = 0; i < nb_obstacle; i++) {
            //On place l'obstacle sur le plateau
            this.placerObstacle(obstacle_image,)
        }
    }

    /**
     * Place les différentes armes sur le plateau
     */
    placerLesArmes() {
        this.armes.forEach(arme => {
            this.placerArme(null, null, arme, true)
        })
    }

    /**
     * Place les différentes joueur sur le plateau
     */
    placerLesJoueurs() {
        this.joueurs.forEach(joueur => {
            this.placerJoueur(joueur, true)
        })
    }

    /**
     * Ajoute une image background à la case {ligne, colonne}
     * @param {Number} ligne la ligne sur la grille
     * @param {Number} colonne la colonne sur la grille
     * @param {String} image l'url de l'image à mettre en background
     */
    setImage(ligne, colonne, image) {
        $(`#grid_${ligne}_${colonne}`).css({
            "background": `url('${image}') no-repeat`,
            "background-size": "contain",
            "width": `${760 / this.nb_grille}px`,
            "height": `${760 / this.nb_grille}px`
        }).removeClass('ombre-arme');
    }

    /**
     * Attribue une nouvelle arme un joueur
     * @param {Number} ligne
     * @param {Number} colonne
     * @param {Personnage} joueur
     * @param {Arme} arme
     */
    prendreUneArme(ligne, colonne, joueur, arme) {
        joueur.force_de_frappe = arme.degat
        joueur.arme = arme
        this.joueur_actuel = joueur
        let index = this.joueurs.findIndex(j => j.id === joueur.id)
        this.miseAJourDonneesJoueur(joueur)
        if (-1 !== index) {
            this.joueurs[index] = joueur
        }
    }



    /**
     * Efface l'arme courante de la grille
     * @param {Number} ligne
     * @param {Number} colonne
     */
    supprimerArmeDeLaGrille(ligne, colonne) {
        this.surface[ligne][colonne].arme = null;
        this.surface[ligne][colonne].element = null;
        this.surface[ligne][colonne].aUneArme = null;
    }

    /**
     *
     * @param {Number} ligne la ligne sur la grille
     * @param {Number} colonne la colonne sur la grille
     * @param {Personnage} joueur le joueur actuel
     * @param {Arme} ancienneArme l'ancienne arme du joueur
     * @param {Arme} nouvelleArme la nouvelle arme du joueur
     */
    changerArme(ligne, colonne, joueur, ancienneArme, nouvelleArme) {
        this.prendreUneArme(ligne, colonne, joueur, nouvelleArme)
        this.placerArme(ligne, colonne, ancienneArme);
    }

    /**
     * Met à jour les données du joueur, notamment les détails de son arme
     * @param {Personnage} joueur
     */
    miseAJourDonneesJoueur(joueur) {
        $(`.data-${joueur.id} .joueur-arme-nom`)
            .text(joueur.arme.nom)
        $(`.data-${joueur.id} .joueur-arme-degat`)
            .text(joueur.arme.degat)
        $(`.data-${joueur.id} .joueur-arme-image`)
            .css({
            'background': `url('${joueur.arme.image}') no-repeat`,
            "background-size": "contain",
            "width": `${150}px`,
            "height": `${150}px`
        })
        $(`.data-${joueur.id} .joueur-force-frappe`)
            .text(joueur.force_de_frappe)
    }


    /**
     * Place un obstacle sur la grille
     * @param {String} image le chemin de l'image de l'obstacle
     */
    placerObstacle(image) {
        let {ligne, colonne} = generator(this.nb_grille - 1)
        if (this.surface[ligne][colonne].element !== true) {
            this.surface[ligne][colonne].obstacle = true;
            this.surface[ligne][colonne].element = true;
            this.setImage(ligne, colonne, image);
        } else {
            this.placerObstacle(image)
        }
    }

    /**
     * Permet de définir les cordonnées du joueur sur la grille
     * @param {Number} ligne la ligne sur la grille
     * @param {Number} colonne la colonne sur la grille
     * @param {Personnage} joueur joueur à  placer
     */
    definierCoordonneesJoeur(ligne, colonne, joueur) {
        this.surface[ligne][colonne].existUnJoueur = true;
        this.surface[ligne][colonne].element = true;
        this.surface[ligne][colonne].joueur = joueur;
        this.miseAJourJoueurPosition(joueur, ligne, colonne);
        $(`#grid_${ligne}_${colonne}`)
            .css({
            "background-color": "",
            "box-shadow": ""
        });
        this.setImage(ligne, colonne, joueur.image);
    }

    /**
     * Met à jour les cordonnées d'un joueur
     * @param {Personnage} joueur le joueur à mettre à jour la position
     * @param {Number} ligne la ligne du joueur sur le plateau
     * @param {Number} colonne la colonne du joueur sur le plateau
     */
    miseAJourJoueurPosition(joueur, ligne, colonne) {
        //On met à jour les coordonnées(position) du joueur sur la grille
        joueur.miseAJourPositionCoordonnees(ligne, colonne);
        let index = this.joueurs.findIndex(j => j.id === joueur.id)
        //On met à jour les informations dans le store global
        this.joueurs[index] = joueur
    }

    /**
     * Efface les anciennes coordonnées du joueur de la position actuelle
     * lorsqu'il se déplace vers une autre case
     */
    effacerPositionJoueur() {
        let {x: ligne, y: colonne} = this.joueur_actuel.position
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

    deboguer() {
        console.log(this.surface)
        console.log(this.armes)
        console.log(this.joueurs)
        console.log(this.joueur_actuel)
    }

    /**
     * Permet de placer un joueur sur la grille
     * @param {Personnage} joueur joueur à placer sur la grille
     * @param {Boolean} initialisation permet de savoir si nous
     * somme à l'initialisation de la grille afin de placer les armes de façon
     * aléatoire
     * @param {Number} ligne la ligne sur la grille
     * @param {Number} colonne la colonne sur la grille
     */
    placerJoueur(joueur, initialisation = false, ligne = null, colonne = null) {
        //Si nous sommes dans une initialisation, on génère les lignes et colonnes
        //de façon aléatoire
        if (initialisation) {
            //On génère une ligne et colonne aléatoire
            let {ligne: l, colonne: c} = generator(this.nb_grille - 1)
            ligne = l
            colonne = c
        }
        if (
            (ligne < this.nb_grille - 1 && this.surface[ligne + 1][colonne].existUnJoueur === true) ||
            (ligne > 0 && this.surface[ligne - 1][colonne].existUnJoueur === true)
        ) {
            this.placerJoueur(joueur, true)
        } else if (
            (colonne < this.nb_grille - 1 && this.surface[ligne][colonne + 1].existUnJoueur === true) ||
            (colonne > 0 && this.surface[ligne][colonne - 1].existUnJoueur === true)
        ) {
            this.placerJoueur(joueur, true)
        } else {
            if (this.surface[ligne][colonne].element !== true) {
                this.definierCoordonneesJoeur(ligne, colonne, joueur);
            } else {
                this.placerJoueur(joueur, true)
            }
        }
    }

    /**
     * Permet de placer une arme sur la grille
     * @param {Number} ligne la ligne sur la grille
     * @param {Number} colonne la colonne sur la grille
     * @param {Arme} arme l'arme à placer sur la grille
     * @param {Boolean} initialisation permet de savoir si nous
     * somme à l'initialisation de la grille afin de placer les armes de façon
     * aléatoire
     */
    placerArme(ligne = null, colonne = null, arme, initialisation = false) {
        if (initialisation) {
            //On génère une ligne et colonne aléatoire
            let {ligne, colonne} = generator(this.nb_grille - 1)
            //Si sur la ligne et colonne générées, il n'ya pas déjà un élement
            if (this.surface[ligne][colonne].element !== true) {
                //On définit les coordonées de l'arme sur la grille
                //et on l'affiche
                this.definirArmeCoordonnees(ligne, colonne, arme);
            } else {
                //Sinon on rappelle la fonction pour générée une nouvelle position
                this.placerArme(ligne, colonne, arme, true)
            }
        } else {
            //Dans le cas contraire, nous sommes dans le cas ou nous plaçons
            //manuellement les armes.
            //Exemple : lorsqu'un joueur change son arme
            this.definirArmeCoordonnees(ligne, colonne, arme);
        }

    }

    /**
     * Permet de définir les coordonnées d'une arme et de l'afficher sur la grille
     * @param {Number} ligne la ligne sur la grille
     * @param {Number} colonne la colonne sur la grille
     * @param {Arme} arme l'arme à afficher
     */
    definirArmeCoordonnees(ligne, colonne, arme) {
        this.surface[ligne][colonne].arme = arme;
        this.surface[ligne][colonne].element = true;
        this.surface[ligne][colonne].aUneArme = true;
        let index = this.armes.findIndex(a => a.id === arme.id)
        //On met à jour les coordonnées de l'arme
        this.armes[index].miseAJourDeLaPosition(ligne, colonne)
        //On met à jour l'image de l'arme
        this.setImage(ligne, colonne, arme.image);
    }

    /**
     * Détermine si nous sommes phase de combat
     * @param {Number} ligne
     * @param {Number} colonne
     * @returns {boolean|boolean}
     */
    estCeEnPostionDeCombat(ligne, colonne){
        return (ligne < this.nb_grille -1 && this.surface[ligne + 1][colonne].existUnJoueur === true) ||
            (ligne > 0 && this.surface[ligne - 1][colonne].existUnJoueur === true) ||
            (colonne < this.nb_grille -1 && this.surface[ligne][colonne+1].existUnJoueur === true) ||
            (colonne > 0 && this.surface[ligne][colonne-1].existUnJoueur === true)

    }
}