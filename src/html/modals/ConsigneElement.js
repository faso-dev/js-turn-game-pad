/**
 *
 */
class ConsigneElement extends HTMLElement{

    constructor() {
        super();
        this.innerHTML = this.launchModal()
    }

    launchModal(){
        return `
            <div class="modal" id="consigneModal" tabindex="-1" role="dialog" aria-labelledby="consigneModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                        Consigne du jeux PlatTour
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>
                        <ul>
                            <li>Vous pouvez vous déplacer que sur les cases en couleur vertes</li>
                            <li>Vous ne pouvez vous déplacer au travers d'un obstacle</li>
                            <li>Vous pouvez ramassez toute arme sur la grille, si celle ci se trouve su votre chemin</li>
                            <li>Pour lancer le combat à un joueur, vous devez vous tenir côte à côte de lui en horizontale ou verticale</li>
                            <li>Pendant le combat vous pouvez soit attaquer ou vous défendre</li>
                            <li>Pendant la défense vous encaissez 50% des dégâts de l'arme de votre adversaire</li>
                            <li>Le combat prend fin, si l'un d'un joueur perd toute sa force</li>
                            <li>
                                Liste des armes avec leurs détails
                                <ul>
                                    <li>Missile : <strong>Dégât : </strong> 100</li>
                                    <li>Grenade : <strong>Dégât : </strong> 80</li>
                                    <li>AK47 : <strong>Dégât : </strong> 75</li>
                                    <li>Arc : <strong>Dégât : </strong> 45</li>
                                    <li>Couteau : <strong>Dégât : </strong> 10</li>
                                </ul>
                            </li>
                        </ul>
                    </p>
                  </div>
                 
                </div>
              </div>
            </div>
        `
    }
}

customElements.define('consigne-modal', ConsigneElement)