window.onload = () => {
    let gm = new GameElement(10);
    gm.launchGame()
    new ConsigneElement()
    new AProposElement()
    $(document).on('click','#consigne, #about', e => {
        e.preventDefault()
    })
}