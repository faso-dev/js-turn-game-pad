/**
 * Ce bout de code est une propriété de Jerôme S.C Daniel Onadja(faso-dev)
 * @author Jerôme S.C Daniel Onadja <jeromeonadja28@gmail.com>
 * @copyright 2020 | Tous droit reservés
 * @licence MIT propulsé par <faso-dev> https://faso-dev.herokuapp.com
 */

/**
 * Composant personnalisé servant comme conteneur principale du jeux
 */
class GameElement extends HTMLElement{
    nb_grille;
    /**
     *
     * @param {Number} nb_grille le nombre de grille à placer sur le plateau
     */
    constructor(nb_grille= 10) {
        super();
        this.nb_grille = nb_grille;
        this.innerHTML = this.createJeuxConteneur('conteneur-de-jeux')

    }

    /**
     * Renvoie le code html du conteneur de jeux
     * @param selector identifiant du conteneur pour le composant
     * @returns {string} le code htlm du composant
     */
    createJeuxConteneur(selector) {
        return `
            <div id="${selector}" class="mt-5"></div>
        `
    }

    launchGame(){
        let plateau = new Plateau([
            new Arme(1,'Couteau', 10,'./assets/images/armes/couteau.png'),
            new Arme(2,'Rockette', 100,'./assets/images/armes/missile.png'),
            new Arme(3,'Arc', 45,'./assets/images/armes/arc.svg'),
            new Arme(4,'Kalashnikov', 75,'./assets/images/armes/kalashnikov.jpg'),
            new Arme(5,'Grenade', 80,'./assets/images/armes/grenade.jpg'),
        ], [
            new Personnage(1,'OC-1',100, './assets/images/personnages/oc-1.png'),
            new Personnage(2,'OC-2',100, './assets/images/personnages/oc-2.png'),
        ], this.nb_grille);
        //Initialisation de la grille
        plateau.init()
        //Placement aléatoire des obstacles
        plateau.placerUnObstacle(8, './assets/images/obstacles/obstacle.jpg')
        //Placement aléatoire des armes
        plateau.placerLesArmes()
        //Placement aléatoire des joueurs
        plateau.placerLesJoueurs()
        //Initialisation du gestion de déplacement sur le plateau
        let mouvement = new Mouvement()
        //Définition des zônes accessibles au joueurs
        mouvement.activerLesZonesAccessibleAuxJoueurs(plateau)
        //On branche notre listener d'évènement au plateau
        this.ecouterLesEvenementsDeCliqueSurLePlateau(plateau, mouvement)
    }

    /**
     *Permet d'écouter les évènements sur le plateau
     * @param {Plateau} plateau
     * @param {Mouvement} mouvement
     */
    ecouterLesEvenementsDeCliqueSurLePlateau(plateau, mouvement){
        $(document).on('click', '.grid', e => {
            let ligne = Number(e.target.dataset.ligne),
                colonne = Number(e.target.dataset.colonne),
                //Booléen pour notifier quand on est en position de changer son arme
                remplacementArme;
            //Si le joueur est autorisé à se déplacer sur la zône ou case x,y
            if (plateau.surface[ligne][colonne].peutSeDeplacer){
                //On éfface la position courante du joueur sur le plateau
                plateau.effacerPositionJoueur();
                //On définit les nouvelles zônes inaccessible au joueur
                mouvement.activerLesZonesInaccessiblesAuxJoueurs(plateau)
                //On rcupère le joueur actuel
                let joueurActuel = plateau.joueur_actuel;
                //Si la la zône actuelle contient
                // une arme et que le joueur actuel
                // n'a pas encore d'arme
                //On la lui attribue
                if (plateau.surface[ligne][colonne].aUneArme && null === joueurActuel.arme) {
                    //Le joueur prend l'arme actuelle
                    plateau.prendreUneArme(ligne, colonne, joueurActuel, plateau.surface[ligne][colonne].arme)
                    //On supprime l'arme actuelle de la grille
                    plateau.supprimerArmeDeLaGrille(ligne, colonne);
                }
                //Sinon le joueur a déjà une arme, on change l'arme du joueur en la remplaçant par l'arme sur la zône
                    //Et en y laissant l'ancienne
                else if (plateau.surface[ligne][colonne].aUneArme && joueurActuel.arme) {
                    let ancienneArme = joueurActuel.arme,
                        nouvelleArme = plateau.surface[ligne][colonne].arme;
                    //Le joueur change son arme actuelle
                    plateau.changerArme(ligne, colonne, joueurActuel, ancienneArme, nouvelleArme)
                    //On notifie que le joueur actuel a changé son arme
                    remplacementArme = true
                }
                //On autorise le joueur à se déplacer sur la colonne x,y
                plateau.placerJoueur(joueurActuel,false, ligne, colonne);
                //On récupère l'index du joueur suivant
                let joueurSuivantIndex = plateau.joueurs.findIndex( j => j.id !== joueurActuel.id)
                //On change le joueur actuel par celui ci
                plateau.joueur_actuel = plateau.joueurs[joueurSuivantIndex]
                //Puis on définit à nouveau les zônes accessibles à ce joueur
                mouvement.activerLesZonesAccessibleAuxJoueurs(plateau, remplacementArme)
                //On détermine si les deux joueurs sont cote à cote pour le combat
                let estEnpositionDeCombat = plateau.estCeEnPostionDeCombat(ligne, colonne)
                //Si vrai, alors on enclenche le combat
                if (estEnpositionDeCombat){
                    //On récupère les identifiants des joueurs
                    let j1Id = $('#joueur-un').data('joueur'),
                        j2Id = $('#joueur-deux').data('joueur')
                    //On récupère les éventuels joueurs suivant leurs identifiant
                    let j1 = plateau.joueurs.find( j => j.id === parseInt(j1Id)),
                        j2 = plateau.joueurs.find( j => j.id === parseInt(j2Id))
                    //On initialose le gestionnaire de combat
                    let action = new Action([j1, j2]);
                    //On initialise le composant du combat aussi
                    let combat = new FightElement(action)
                    //On remplace le composant du plateau par celui du combat
                    $('#conteneur-de-jeux').parent().replaceWith(combat)
                    //On active l'écouteur d'action(qui doit attaquer, défendre)
                    combat.combatActionListener()
                }

            }
        })
    }
}
//Enregistrement de notre composant personalisé
customElements.define('jeux-de-tour', GameElement)