
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
        let armes = [
            new Arme(1,'Couteau', 20,'./assets/images/armes/couteau.png'),
            new Arme(2,'Machette', 30,'./assets/images/armes/machette.png'),
            new Arme(3,'Pistolet', 50,'./assets/images/armes/pistolet.png'),
            new Arme(4,'AK47', 70,'./assets/images/armes/ak47.jpg'),
        ]
        let plateau = new Plateau(armes, [], this.nb_grille);
        plateau.init()
        plateau.placerUnObstacle()
        plateau.placerLesArmes()
        plateau.afficher()
    }
}

customElements.define('jeux-de-tour', GameElement)