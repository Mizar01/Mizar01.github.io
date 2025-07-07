createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("💩", { name: "flakes", font: "24px Arial", frequency: 1000, quantity: 1, });

    autoTimedTexts(`
        GIORNATA DELLO SPONSOR
        *
        Ti sei scottato stando sotto il sole per mezz'ora?*
        Non preoccuparti, da oggi c'è GIULIO STALKER.
        GIULIO STALKER ti seguirà come un'ombra, e ti farà ombra, sei salvo.
        ATTENZIONE: può provocare telefonate anonime, squilli di campanello alle 3 di notte
        e scatti di macchina fotografica indesiderati.
        **
        Stanco di stare dietro a degli infanti per tutta la giornata?*
        Da oggi non ci sono più problemi, con GIULIO STALKER PDFL PLUS risolvi tutti i tuoi problemi.
        Oltre alla solita ombra, si occuperà con passione ai tuoi figli, e tu potrai finalmente rilassarti.
        ATTENZIONE: può provocare traumi psicofisici, disturbi del sonno e problemi legali.
    `, 150)



}