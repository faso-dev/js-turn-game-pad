/**
 * Ce bout de code est une propriété de Jerôme S.C Daniel Onadja(faso-dev)
 * @author Jerôme S.C Daniel Onadja <jeromeonadja28@gmail.com>
 * @copyright 2020 | Tous droit reservés
 * @licence MIT propulsé par <faso-dev> https://faso-dev.herokuapp.com
 */

/**
 * Composant personalisé pour le combat
 */
class FightElement extends HTMLElement{
    action
    /**
     * Constructeur du composant de combat
     * @param {Action} action le gestionnaire des actions
     */
    constructor(action) {
        super();
        this.action = action
        this.innerHTML = this.initialserLeCombat()
    }

    /**
     * Crée le code html du composant combat
     * @returns {string} le composant html du combat
     */
    initialserLeCombat(){
        return `
                <div class="card" style="margin-top: 300px;">
                    <div class="card-header">
                        <h3 class="text-center">Le combat a commencé</h3>
                    </div>
                    <div class="card-body">
                       <div class="row align-items-center justify-content-start">
                            <div class="col-lg-6">
                                <h1>${this.action.joueurs[0].nom}</h1>
                                <div id="joueur-1-action-panel">
                                    <button 
                                            class="btn btn-danger" 
                                            data-joueur="${this.action.joueurs[0].id}" 
                                            id="attaquer-${this.action.joueurs[0].id}">
                                            Attaquer <span class="arme"></span>
                                    </button>
                                    <button 
                                            class="btn btn-success" 
                                            data-joueur="${this.action.joueurs[0].id}" 
                                            id="defendre-${this.action.joueurs[0].id}">
                                            Défendre
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-6 text-right">
                                 <h1>${this.action.joueurs[1].nom}</h1>
                                 <div id="joueur-2-action-panel">
                                    <button 
                                                class="btn btn-danger" 
                                                data-joueur="${this.action.joueurs[1].id}"
                                                id="attaquer-${this.action.joueurs[1].id}">
                                            Attaquer <span class="arme"></span>
                                    </button>
                                    <button 
                                                class="btn btn-success" 
                                                data-joueur="${this.action.joueurs[1].id}" 
                                                id="defendre-${this.action.joueurs[1].id}">
                                                Défendre
                                    </button>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }

    /**
     * Ecoute les évenements liés au click sur les boutons de combat
     */
    combatActionListener(){
        //Sert à définir le gagnant à la fin du jeu
        let gagnant = null
        //On écoute les clics sur les bouttons d'attaques
        $(document).on('click', '#attaquer-1, #attaquer-2', e => {
            //L'identifiant du joueur qui a cliqué sur le boutton d'attaque
            let jClickId = parseInt(e.target.dataset.joueur),
                //L'index du joueur attaqué
                jIndex2 =  this.action.joueurs.findIndex( j => j.id !== jClickId),
                //L'index du joueur attaquant
                jIndex1 =  this.action.joueurs.findIndex( j => j.id === jClickId)
            //Le joueur attaquant attaque le joueur attaqué
            this.action.attaquer(jIndex1, jIndex2)
            //On réinitialise la défense de tous les joueurs
            this.action.joueurs[jIndex1].defendre(false)
            this.action.joueurs[jIndex2].defendre(false)
            //On met à jour la force restante du joueur attaqué dans l'interface du jeux
            this.miseAjourInformationsCombatInterface(jClickId, jIndex2, jIndex1);
            //On vérifie à chaque fois qui est le gagnat enfin de mettre fin au jeux
            if (this.action.joueurs[jIndex1].force === 0){
                gagnant = this.action.joueurs[jIndex2]
            }else if (this.action.joueurs[jIndex2].force === 0){
                gagnant = this.action.joueurs[jIndex1]
            }
            //Si on a un gagnant
            if (gagnant){
                //On remplace le composant de combât par celui de la victoire
                $('#jeux-conteneur').html(new VictoireElement(gagnant))
                //On met à jour les infos des deux joueurs(force restante)
                this.miseAjourInformationsCombatInterface(jClickId, jIndex2);
            }
            //On désactive le panel d'action(boutton de défense et d'attaque)
            // du joueur attaquant
            this.actionPanel(e.target.id)
            //Puis on active le panel d'action(boutton de défense et d'attaque)
            // du joueur attaqué pour qu'il puisse à son tour attaquer ou se défendre
            this.actionPanel(e.target.id.split('-')[0]+ '-' + (jClickId === 1 ? 2 : 1), false)
        })

        //On écoute les actions de défense chez les deux joueurs
        $(document).on('click', '#defendre-1, #defendre-2', e => {
            //L'identifiant du joueur qui veut se défenre
            let jClickId = parseInt(e.target.dataset.joueur, 10),
                //L'index du joueur qui veut se défendre
                jIndex1 =  this.action.joueurs.findIndex( j => j.id === jClickId)
            //On définit le mode d'attaque du joueur en mode défense
            this.action.joueurs[jIndex1].defendre(true)
            //On désactive le panel d'action(boutton de défense et d'attaque)
            // du joueur qui se défend
            this.actionPanel(e.target.id)
            //Puis on active le panel d'action(boutton de défense et d'attaque)
            // du joueur adverse pour qu'il puisse à son tour attaquer ou se défendre
            this.actionPanel(e.target.id.split('-')[0]+ '-' + (jClickId === 1 ? 2 : 1), false)
        })

    }

    /**
     * Met à jour les informations des joueurs sur le graphique
     * @param jClickId l'identifiant du joueur qui est attaqué
     * @param jIndex2 l'index du joueur qui est attaqué
     */
    miseAjourInformationsCombatInterface(jClickId, jIndex2) {
        $(`#${jClickId === 1 ? 2 : 1}`).text(this.action.joueurs[jIndex2].force)
    }

    /**
     * Permet de desactver le panel de combat d'un joueur
     * @param {String} joueurSelector le sélection du joueur
     * @param {Boolean} handle détermine si on active ou désactive le panel du joueur
     */
    actionPanel(joueurSelector, handle = true){
        $(`#${joueurSelector}`).parent().children('button').attr('disabled', handle)
    }

}
//Enregistrement de notre composant personalisé
customElements.define('jeu-combat', FightElement)