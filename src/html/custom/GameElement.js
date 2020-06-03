
function createJeuxConteneur(selector) {
    return `
        <div id="${selector}" class="mt-5"></div>
    `
}

class GameElement extends HTMLElement{
    nb_grille;
    /**
     *
     * @param {Number} nb_grille le nombre de grille à placer sur le plateau
     */
    constructor(nb_grille= 10) {
        super();
        this.nb_grille = nb_grille;
        this.innerHTML = createJeuxConteneur('conteneur-de-jeux')

    }

    launchGame(){
        let plateau = new Plateau([
            new Arme(1,'Couteau', 20,'./assets/images/armes/couteau.png'),
            new Arme(2,'Machette', 30,'./assets/images/armes/machette.png'),
            new Arme(3,'Pistolet', 50,'./assets/images/armes/pistolet.png'),
            new Arme(4,'AK47', 70,'./assets/images/armes/ak47.jpg'),
        ], [
            new Personnage(1,'OC-1',100, './assets/images/personnages/oc-1.png'),
            new Personnage(2,'OC-2',100, './assets/images/personnages/oc-2.jpg'),
        ], this.nb_grille);
        plateau.init()
        plateau.placerUnObstacle()
        plateau.placerLesArmes()
        plateau.placerLesJoueurs()
        let mouvement = new Mouvement();
        mouvement.activerLesZonesAccessibleAuxJoueurs(plateau)
        this.ecouterLesEvenementsDeCliqueSurLePlateau(plateau, mouvement)

    }

    /**
     *
     * @param {Plateau} plateau
     * @param {Mouvement} mouvement
     */
    ecouterLesEvenementsDeCliqueSurLePlateau(plateau, mouvement){
        $(document).on('click', '.grid', e => {
            let ligne = Number(e.target.dataset.ligne),
                colonne = Number(e.target.dataset.colonne),
                remplacementArme = false
            if (plateau.surface[ligne][colonne].peutSeDeplacer){
                plateau.effacerPositionJoueur();
                mouvement.activerLesZonesInaccessiblesAuxJoueurs(plateau)
                let joueurActuel = plateau.joueur_actuel;
                //----------------------DROP PREVIOUS WEAPON LOGIC---------------------

                //Si la la zône actuelle contient
                // une arme et que le joueur actuel
                // n'a pas encore d'arme
                //On la lui attribue
                if (plateau.surface[ligne][colonne].aUneArme && null === joueurActuel.arme) {
                    plateau.joueur_actuel.arme = plateau.surface[ligne][colonne].arme
                    let index = plateau.joueurs.findIndex(j => j.id === joueurActuel.id)
                    if(-1 !== index){
                        plateau.joueurs[index] = joueurActuel
                    }
                    plateau.placer(ARME,null , null, null, ligne, colonne);
                } else if (plateau.surface[ligne][colonne].aUneArme && joueurActuel.arme) {
                    let ancienneArme = joueurActuel.arme
                    plateau.joueur_actuel.arme = plateau.surface[ligne][colonne].arme;
                    let index = plateau.joueurs.findIndex(j => j.id === joueurActuel.id)
                    if(-1 !== index){
                        plateau.joueurs[index] = joueurActuel
                    }
                    plateau.placer(ARME, ancienneArme.image, ancienneArme, null, ligne, colonne, true);

                    remplacementArme = true
                }
                plateau.placer(JOUEUR,joueurActuel.image,null,joueurActuel, ligne, colonne);
                let joueurSuivantIndex = plateau.joueurs.findIndex( j => j.id !== joueurActuel.id)
                plateau.joueur_actuel = plateau.joueurs[joueurSuivantIndex]
                console.log(remplacementArme)
                mouvement.activerLesZonesAccessibleAuxJoueurs(plateau, remplacementArme)
                if (remplacementArme)
                    remplacementArme = false


            }
        })
    }
}

customElements.define('jeux-de-tour', GameElement)