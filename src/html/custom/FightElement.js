/**
 *
 */
class FightElement extends HTMLElement{

    constructor() {
        super();
        this.innerHTML = `
           <div class="col-lg-8">
                <h1>Le combat commence</h1>
           </div>
        `
    }

}

customElements.define('combat-conteneur', FightElement)