/**
 *
 */
class FightElement extends HTMLElement{
    action
    /**
     *
     * @param {Action} action
     */
    constructor(action) {
        super();
        this.action = action
        this.innerHTML = this.initialserLeCombat()
    }

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
                                            id="attaquer-1">
                                            Attaquer <span class="arme"></span>
                                    </button>
                                    <button 
                                            class="btn btn-success" 
                                            data-joueur="${this.action.joueurs[0].id}" 
                                            id="defendre-1">
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
                                                id="attaquer-2">
                                            Attaquer <span class="arme"></span>
                                    </button>
                                    <button 
                                                class="btn btn-success" 
                                                data-joueur="${this.action.joueurs[1].id}" 
                                                id="defendre-2">
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
        let gagnant = null
        $(document).on('click', '#attaquer-1, #attaquer-2', e => {
            let jClickIndex = parseInt(e.target.dataset.joueur),
                jIndex2 =  this.action.joueurs.findIndex( j => j.id !== jClickIndex),
                jIndex1 =  this.action.joueurs.findIndex( j => j.id === jClickIndex)

            this.action.attaquer(jIndex1, jIndex2)
            this.action.joueurs[jIndex1].defendre(false)
            this.action.joueurs[jIndex2].defendre(false)
            //On met à jour la force restante du joueur dans l'interface du jeux
            this.miseAjourInformationsCombatInterface(jClickIndex, jIndex2, jIndex1);
            //On vérifie à chaque fois qui est le gagnat enfin de mettre fin au jeux
            if (this.action.joueurs[jIndex1].force === 0){
                gagnant = this.action.joueurs[jIndex2]
            }else if (this.action.joueurs[jIndex2].force === 0){
                gagnant = this.action.joueurs[jIndex1]
            }
            if (gagnant){
                $('#jeux-conteneur').html(new VictoireElement(gagnant))
                this.miseAjourInformationsCombatInterface(jClickIndex, jIndex2);
            }

            this.actionPanel(e.target.id)
            this.actionPanel(e.target.id.split('-')[0]+ '-' + (jClickIndex === 1 ? 2 : 1), false)
        })

        $(document).on('click', '#defendre-1, #defendre-2', e => {
            let jClickIndex = parseInt(e.target.dataset.joueur, 10),
                jIndex2 =  this.action.joueurs.findIndex( j => j.id !== jClickIndex),
                jIndex1 =  this.action.joueurs.findIndex( j => j.id === jClickIndex)
            this.action.joueurs[jIndex1].defendre(true)
            this.actionPanel(e.target.id)
            this.actionPanel(e.target.id.split('-')[0]+ '-' + (jClickIndex === 1 ? 2 : 1), false)
            this.miseAjourInformationsCombatInterface(jClickIndex, jIndex2);
        })

    }

    miseAjourInformationsCombatInterface(jClickIndex, jIndex2) {
        $(`#${jClickIndex === 1 ? 2 : 1}`).text(this.action.joueurs[jIndex2].force)
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

customElements.define('jeu-combat', FightElement)