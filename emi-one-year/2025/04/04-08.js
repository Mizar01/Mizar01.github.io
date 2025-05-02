createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("👰🏼", { name: "flakes1", font: "24px Arial", frequency: 1000, quantity: 1 });
    createTextSnowFlakes("🤵🏻", { name: "flakes2", font: "24px Arial", frequency: 1000, quantity: 1 });

    autoTimedTexts(`
        Rubrica Locations*
        *
        LAIKA FOR LIFE Wedding Best Place
        *
        Località a piacere
        1€ a persona, 0.80€ se ci si porta lo spazzolino da casa
        Gli ospiti possono arrivare comodamente al park riservato.
        Ampio giardino asfaltato
        Il catering è composto dal nostro amatissimo e magrissimo Arcibald
        Capienza max 20 ospiti di cui 10 molto piccoli
        Forchette e coltelli per tutti.
        Se qualcuno vuole rimanere in piedi è meglio,
        Se qualcuno deve restare a sera,
        Il comodo letto a soffietto sul soffitto del camper è a vostra disposizione.
        Vi aspettiamo.
        PS. È scongigliato l'uso dei servizi igenici del campeggio
        onde evitare cattivi odori in zona ristorante.
    `, 170)



}