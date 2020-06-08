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
     *
     * @returns {string}
     */
    celebrer(){
        return `
                <div class="card" style="margin-top: 300px;">
                    <div class="card-header">
                        <h3 class="text-center">Combat terminé</h3>
                    </div>
                    <div class="card-body">
                       <div class="text-center">
                            <h5>Le gagnant est ${this.gagnant.nom} </h5>
                        </div>
                    </div>
                </div>
        `
    }
}

customElements.define('jeu-victoire', VictoireElement)