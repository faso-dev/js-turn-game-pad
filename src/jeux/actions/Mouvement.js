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
            //Looping to display movable spots
            for (let c = 1; c <= 3; c++) {
                colonne = colonne - 1; //Reducing instead the value of col here because, Left means minus col but on the same row
                if (colonne < 0) {
                    break; //Break if col is less than 0, that is goes out of the map
                }
                // If there's a block or player in the grid, i break
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
        if (plateau.surface[ligne][colonne].existUnJoueur === true) {
            //Looping to display movable spots
            for (let c = 1; c <= 3; c++) {
                colonne = colonne + 1; //Increasing the value of col because right means plus but on the same row
                if (colonne >= plateau.nb_grille) {
                    break; //Break loop if we move out of the map that is, more than or equal to 10
                }
                // If there's a block or player in the grid, i break
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
        if (plateau.surface[ligne][colonne].existUnJoueur === true) {
            //Looping to display movable spots
            for (let l = 1; l <= 3; l++) {
                ligne = ligne - 1; // Reducing the value of row because up means minus but on the same col
                if (ligne < 0) {
                    break; //Break loop if we are out of the map, that is less than 0
                }
                // If there's a block or player in the grid, i break
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

    nouvelITineraire(plateau, ligne, colonne, remplacement) {
        if (plateau.surface[ligne][colonne].aUneArme !== true) {
            plateau.surface[ligne][colonne].peutSeDeplacer = true;
            $(`#grid_${ligne}_${colonne}`).css("background", "rgb(160, 180, 60)");
        } else if (remplacement) {
            $(`#grid_${ligne}_${colonne}`).css("box-shadow", "");
            plateau.surface[ligne][colonne].peutSeDeplacer = true;
        }else {
            $(`#grid_${ligne}_${colonne}`).css("box-shadow", "inset 0 0 0 2000px rgba(243, 255, 67, 0.1)");
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
        if (plateau.surface[ligne][colonne].existUnJoueur === true) {
            for (let l = 1; l <= 3; l++) {
                ligne = ligne + 1; //Increasing the value of rows because down mean plus but on the same col
                if (ligne >= plateau.nb_grille) {
                    break; //Break loop if we move out of the map that is, more than or equal to 10
                }
                // If there's a block or player in the grid, i break
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

        //Looping to remove display movable spots
        for (let l = 1; l <= 3; l++) {
            ligne = ligne - 1; // Reducing the value of row because up means minus but on the same col
            if (ligne < 0) {
                break; //Break loop if we are out of the map, that is less than 0
            }
            // If there's a block or player in the grid, i break
            if (
                (plateau.surface[ligne][colonne].obstacle === true) ||
                (plateau.surface[ligne][colonne].existUnJoueur === true)
            ) {
                break;
            }
            this.definirLesItinerairesInaccessibles(plateau, ligne, colonne);

        }
    }

    /**
     * Détermine toutes les zones inaccessibles vers le bas
     * @param {Plateau} plateau
     */
    zoneInaccessibleVersLeBas(plateau){
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;

        //Looping to remove display movable spots
        for (let l = 1; l <= 3; l++) {
            ligne = ligne + 1; // Reducing the value of row because up means minus but on the same col
            if (ligne >= plateau.nb_grille) {
                break; //Break loop if we are out of the map, that is less than 0
            }
            // If there's a block or player in the grid, i break
            if (
                (plateau.surface[ligne][colonne].obstacle === true) ||
                (plateau.surface[ligne][colonne].existUnJoueur === true)
            ) {
                break;
            }
            this.definirLesItinerairesInaccessibles(plateau, ligne, colonne);

        }
    }

    /**
     * Détermine toutes les zones inaccessibles vers la gauche
     * @param {Plateau} plateau
     */
    zoneInaccessibleVersLaGauche(plateau){
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;

        //Looping to remove display movable spots
        for (let c = 1; c <= 3; c++) {
            colonne = colonne - 1; // Reducing the value of row because up means minus but on the same col
            if (colonne < 0) {
                break; //Break loop if we are out of the map, that is less than 0
            }
            // If there's a block or player in the grid, i break
            if (
                (plateau.surface[ligne][colonne].obstacle === true) ||
                (plateau.surface[ligne][colonne].existUnJoueur === true)
            ) {
                break;
            }
            this.definirLesItinerairesInaccessibles(plateau, ligne, colonne);

        }
    }

    /**
     * Détermine toutes les zones inaccessibles vers la droite
     * @param {Plateau} plateau
     */
    zoneInaccessibleVersLaDroite(plateau){
        let {x: ligne, y: colonne} = plateau.joueur_actuel.position;

        //Looping to remove display movable spots
        for (let c = 1; c <= 3; c++) {
            colonne = colonne + 1; // Reducing the value of row because up means minus but on the same col
            if (colonne >= plateau.nb_grille) {
                break; //Break loop if we are out of the map, that is less than 0
            }
            // If there's a block or player in the grid, i break
            if (
                (plateau.surface[ligne][colonne].obstacle === true) ||
                (plateau.surface[ligne][colonne].existUnJoueur === true)
            ) {
                break;
            }
            this.definirLesItinerairesInaccessibles(plateau, ligne, colonne);

        }
    }

    /**
     * Définit la couleur des zônes inaccessibles
     * @param {Plateau} plateau
     * @param {Number} ligne
     * @param {Number} colonne
     */
    definirLesItinerairesInaccessibles(plateau, ligne, colonne){
        if (
            (plateau.surface[ligne][colonne].aUneArme !== true)
        ) {
            //If there's no weapon i highlight the box
            plateau.surface[ligne][colonne].peutSeDeplacer = false;
            $(`#grid_${ligne}_${colonne}`).css("background", "");
        }else {
            plateau.surface[ligne][colonne].peutSeDeplacer = false;
            $(`#grid_${ligne}_${colonne}`).css("background", "");
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