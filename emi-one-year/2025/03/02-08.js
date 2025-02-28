createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("👰🏼", { name: "flakes1", font: "24px Arial", frequency: 1000, quantity: 1 });
    createTextSnowFlakes("🤵🏻", { name: "flakes2", font: "24px Arial", frequency: 1000, quantity: 1 });

    autoTimedTexts(`
        Rubrica Locations*
        *
        VENICE DOOR M1 Wedding Hall
        *
        Vicina al centro di una città multiculturale
        Questa location è rinomata per le sue bellezze, una volta fuori dalla metro
        *
        2,20€ a persona, 4,40€ A/R
        Gli ospiti possono arrivare comodamente senza bisogno dell'auto.
        Tutti potranno godere dell'intricato e labirintico giardino interno.
        Il catering è ben organizzato con chioschetti loschi pieni di panini e pizzette,
        e per i più esigenti ci sono i fornitissimi distributori automatici.
        La cerimonia può essere celebrata ai tornelli
        Non servono testimoni, i controllori sono qui per te.
        I servizi igenici sono distribuiti lungo tutti i muri e le scale,
        ed offrono agli ospiti un ricco bouquet di profumi e colori.
        Offriamo anche il servizio Live music di un artista di strada a sorpresa.
        Come bomboniere vi proponiamo dei piccoli vagoni della metro, colorati e profumati come i nostri treni.
        *
        Seguite la linea rossa, vi aspettiamo.
    `, 170)



}