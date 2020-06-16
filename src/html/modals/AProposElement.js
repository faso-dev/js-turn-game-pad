/**
 *
 */
class AProposElement extends HTMLElement{
    constructor() {
        super();
        this.innerHTML = this.launchModal()
    }

    launchModal(){
        return `
            <div class="modal" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="aboutModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                        A propos du jeux PlatTour
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>
                        Ce jeux a été developpé par Daniel S.C Onadja de <a href="https://faso-dev.herokuapp.com">faso-dev</a>. <br>
                        Le but du jeux est de s'initier en javaScript en adoptant des bonnes pratiques de codages, mais aussi dans le
                        but de valider le <strong>projet 6</strong> <a href="https://openclassrooms.com/en/paths/60/projects/56/assignment">Créez un jeu de plateau tour par tour en JS</a>
                        sur le parcours de <a href="https://openclassrooms.com/en/dashboard/paths#path-60">Frontend-Developer sur Openclassrooms.</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
        `
    }
}

customElements.define('about-modal', AProposElement)