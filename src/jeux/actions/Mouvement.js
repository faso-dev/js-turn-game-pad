/**
 * Classe spécialisée dans les mouvents des joueurs sur le plateau
 */
class Mouvement {

    /**
     * Permet de se déplacer vers la gauche
     * @param {Plateau} plateau
     * @param {Boolean} remplacement
     */
    aGauche(plateau, remplacement) {
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;
        if (plateau.surface[ligne][colonne].existUnJoueur === true) {
            //On affiche si possible les 3 zônes accessible à gauche
            for (let c = 1; c <= 3; c++) {
                colonne = colonne - 1; //Reducing instead the value of col here because, Left means minus col but on the same row
                if (colonne < 0) {
                    break; //On est en dehors de la grille
                }
                if (
                    (plateau.surface[ligne][colonne].obstacle === true) ||
                    (plateau.surface[ligne][colonne].existUnJoueur === true)
                ) {
                    break;
                }
                this.nouvelITineraire(plateau, ligne, colonne, remplacement);
            }
        }
    }

    /**
     * Permet de se déplacer vers la droite
     * @param {Plateau} plateau
     * @param {Boolean} remplacement
     */
    aDroite(plateau, remplacement) {
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;

        //Si on a un joueur est à la position{ligne, colonne}
        if (plateau.surface[ligne][colonne].existUnJoueur === true) {
            //On affiche si possible les 3 zônes accessible à droite
            for (let c = 1; c <= 3; c++) {
                colonne = colonne + 1; //Increasing the value of col because right means plus but on the same row
                if (colonne >= plateau.nb_grille) {
                    break; //On est en dehors de la grille
                }
                if (
                    (plateau.surface[ligne][colonne].obstacle === true) ||
                    (plateau.surface[ligne][colonne].existUnJoueur === true)
                ) {
                    break;
                }
                this.nouvelITineraire(plateau, ligne, colonne, remplacement);
            }
        }
    }

    /**
     * Permet de se déplacer vers le haut
     * @param {Plateau} plateau
     * @param {Boolean} remplacement
     */
    enHaut(plateau, remplacement) {
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;
        //Si on a un joueur est à la position{ligne, colonne}
        if (plateau.surface[ligne][colonne].existUnJoueur === true) {
            //On affiche si possible les 3 zônes accessible par le haut
            for (let l = 1; l <= 3; l++) {
                ligne = ligne - 1; // On doit diminuer de 1 à chaque itération la ligne
                if (ligne < 0) {
                    break; //On est en dehors de la grille
                }
                if (
                    (plateau.surface[ligne][colonne].obstacle === true) ||
                    (plateau.surface[ligne][colonne].existUnJoueur === true)
                ) {
                    break;
                }
                this.nouvelITineraire(plateau, ligne, colonne, remplacement);
            }
        }

    }

    /**
     * Détermine et marque cette position accessible ou non
     * @param {Plateau} plateau
     * @param {Number} ligne
     * @param {Number} colonne
     * @param {Boolean} remplacement
     */
    nouvelITineraire(plateau, ligne, colonne, remplacement) {
        //A l'initialisation du plateau, si y'a pas d'arme sur
        // la position {ligne, colonne}, on définit la couleur
        // qui permet de notifier qu'un joueur peut accèder à cette
        // zône
        if (plateau.surface[ligne][colonne].aUneArme !== true) {
            plateau.surface[ligne][colonne].peutSeDeplacer = true;
            $(`#grid_${ligne}_${colonne}`).addClass('accessible');
        }
        //Sinon si on veut remplacer une arme par une autre, on supprime le background
            // de cette position
        else if (remplacement) {
            $(`#grid_${ligne}_${colonne}`).removeClass('ombre-arme');
            plateau.surface[ligne][colonne].peutSeDeplacer = true;
        }else {
            if(!$(`#grid_${ligne}_${colonne}`).hasClass('ombre-arme')){
                $(`#grid_${ligne}_${colonne}`).addClass('ombre-arme');
            }else {
                $(`#grid_${ligne}_${colonne}`).removeClass('ombre-arme');
            }
            plateau.surface[ligne][colonne].peutSeDeplacer = true;
        }
    }

    /**
     * Permet de se déplacer vers le bas
     * @param {Plateau} plateau
     * @param {Boolean} remplacement
     */
    enBas(plateau, remplacement) {
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;
        //Si on a un joueur à la position{ligne, colonne}
        if (plateau.surface[ligne][colonne].existUnJoueur === true) {
            //On affiche si possible les 3 zônes accessible vers le bas
            for (let l = 1; l <= 3; l++) {
                ligne = ligne + 1; //on augmente de 1 pour marquer la zone suivante comme accessible
                if (ligne >= plateau.nb_grille) {
                    break; //On est en dehors de la grille
                }
                if (
                    (plateau.surface[ligne][colonne].obstacle === true) ||
                    (plateau.surface[ligne][colonne].existUnJoueur === true)
                ) {
                    break;
                }
                this.nouvelITineraire(plateau, ligne, colonne, remplacement);
            }
        }
    }

    /**
     * Détermine toutes les zones inaccessibles vers le haut
     * @param {Plateau} plateau
     */
    zoneInaccessibleVersLeHaut(plateau){
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;
        //Efface les 3 précédentes zônes autorisée pour le joueur
        for (let l = 1; l <= 3; l++) {
            ligne = ligne - 1; // on diminue la ligne à chaque itération pour aller vers le haut
            if (ligne < 0) {
                break; //On stope la boucle car nous sommes en dehors de la grille
            }
            //S'il y'a un obstacle ou un joueur, on stope la boucle
            if (
                (plateau.surface[ligne][colonne].obstacle === true) ||
                (plateau.surface[ligne][colonne].existUnJoueur === true)
            ) {
                break;
            }
            //On marque cette zône innaccessible
            this.desactiverUneZone(plateau, ligne, colonne);
        }
    }

    /**
     * Détermine toutes les zones inaccessibles vers le bas
     * @param {Plateau} plateau
     */
    zoneInaccessibleVersLeBas(plateau){
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;

        //Efface les 3 précédentes zônes autorisée pour le joueur
        for (let l = 1; l <= 3; l++) {
            ligne = ligne + 1; // on augmente la ligne à chaque itération pour aller en bas
            if (ligne >= plateau.nb_grille) {
                break; //On stope la boucle car nous sommes en dehors de la grille
            }
            //S'il y'a un obstacle ou un joueur, on stope la boucle
            if (
                (plateau.surface[ligne][colonne].obstacle === true) ||
                (plateau.surface[ligne][colonne].existUnJoueur === true)
            ) {
                break;
            }
            //On marque cette zône innaccessible
            this.desactiverUneZone(plateau, ligne, colonne);
        }
    }

    /**
     * Détermine toutes les zones inaccessibles vers la gauche
     * @param {Plateau} plateau
     */
    zoneInaccessibleVersLaGauche(plateau){
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;
        //Efface les 3 précédentes zônes autorisée pour le joueur
        for (let c = 1; c <= 3; c++) {
            colonne = colonne - 1; //on diminue la colonne à chaque itération pour aller vers la gauche
            if (colonne < 0) {
                break; //On stope la boucle car nous sommes en dehors de la surface de la grille
            }
            //S'il y'a un obstacle ou un joueur, on stope la boucle
            if (
                (plateau.surface[ligne][colonne].obstacle === true) ||
                (plateau.surface[ligne][colonne].existUnJoueur === true)
            ) {
                break;
            }
            //Sinon on marque cette zone inaccessible
            this.desactiverUneZone(plateau, ligne, colonne);
        }
    }

    /**
     * Détermine toutes les zones inaccessibles vers la droite
     * @param {Plateau} plateau
     */
    zoneInaccessibleVersLaDroite(plateau){
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;

        //Efface les 3 précédentes zônes autorisée pour le joueur
        for (let c = 1; c <= 3; c++) {
            colonne = colonne + 1; // on augmente d'un pas la colonne pour aller à droite
            if (colonne >= plateau.nb_grille) {
                break; //On stope la boucle car nous sommes en dehors de la surface de la grille
            }
            //S'il y'a un obstacle ou un joueur, on stope la boucle
            if (
                (plateau.surface[ligne][colonne].obstacle === true) ||
                (plateau.surface[ligne][colonne].existUnJoueur === true)
            ) {
                break;
            }
            //Sinon on marque cette zone inaccessible
            this.desactiverUneZone(plateau, ligne, colonne);

        }
    }

    /**
     * Marque la zône {ligne, colonne} inaccessible
     * @param {Plateau} plateau
     * @param {Number} ligne
     * @param {Number} colonne
     */
    desactiverUneZone(plateau, ligne, colonne){
        //S'il n'y a pas une arme sur la position{ligne, colonne}
        if ((plateau.surface[ligne][colonne].aUneArme !== true)) {
            //On marque cette zone innaccessible
            plateau.surface[ligne][colonne].peutSeDeplacer = false;
            $(`#grid_${ligne}_${colonne}`).removeClass('accessible');
        }else {//Sinon si nous faisons face à un obstacle ou un joueur
            plateau.surface[ligne][colonne].peutSeDeplacer = false;
            $(`#grid_${ligne}_${colonne}`).addClass('inaccessible');
        }
    }
    /**
     * Définit les zônes sur lesquelles un joueur à le droit de s'y rendre
     * @param {Plateau} plateau le plateau du jeu
     * @param {Boolean} remplacement
     */
    activerLesZonesAccessibleAuxJoueurs(plateau, remplacement = false){
        this.enHaut(plateau, remplacement)
        this.enBas(plateau, remplacement)
        this.aGauche(plateau, remplacement)
        this.aDroite(plateau, remplacement)
    }

    /**
     * Définit les zônes sur lesquelles un joueur ne peut aller
     * @param {Plateau} plateau
     */
    activerLesZonesInaccessiblesAuxJoueurs(plateau){
        this.zoneInaccessibleVersLeHaut(plateau)
        this.zoneInaccessibleVersLeBas(plateau)
        this.zoneInaccessibleVersLaGauche(plateau)
        this.zoneInaccessibleVersLaDroite(plateau)
    }

}