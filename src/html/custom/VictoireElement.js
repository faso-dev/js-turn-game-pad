/**
 * Ce bout de code est une propriété de Jerôme S.C Daniel Onadja(faso-dev)
 * @author Jerôme S.C Daniel Onadja <jeromeonadja28@gmail.com>
 * @copyright 2020 | Tous droit reservés
 * @licence MIT propulsé par <faso-dev> https://faso-dev.herokuapp.com
 */


/**
 * Composant personalisé pour rendre la victoire d'un joueur
 */
class VictoireElement extends HTMLElement{
    /**
     * Le gagnant du combat
     * @param {Personnage} gagnant
     */
    constructor(gagnant) {
        super();
        this.gagnant = gagnant
        this.innerHTML = this.celebrer()
    }

    /**
     * Le code html du composant
     * @returns {string}
     */
    celebrer(){
        return `
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Combat terminé</h3>
                    </div>
                    <div class="card-body">
                       <div class="text-center">
                            <h2 class="text-green">Le gagnant est ${this.gagnant.nom} </h2>
                        </div>
                        <div style="background: url('./assets/images/victoire/trophy.jpg') no-repeat; object-fit: cover!important; width: 100%!important; height: 700px!important;" class="img-fluid"></div>
                        <a href="${window.location.href}" class="btn btn-primary btn-lg mt-3">Nouvelle partie</a>
                    </div>
                </div>
        `
    }
}
//Enregistrement de notre composant personalisé
customElements.define('jeu-victoire', VictoireElement)