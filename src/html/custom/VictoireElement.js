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
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Combat terminé</h3>
                    </div>
                    <div class="card-body">
                       <div class="text-center">
                            <h5>Le gagnant est ${this.gagnant.nom} </h5>
                        </div>
                        <div style="background: url('./assets/images/victoire/trophy.jpg') no-repeat; object-fit: cover!important; width: 100%!important; height: 700px!important;" class="img-fluid"></div>
                        <a href="${window.location.href}" class="btn btn-primary mt-3">Nouvelle partie</a>
                    </div>
                </div>
        `
    }
}

customElements.define('jeu-victoire', VictoireElement)