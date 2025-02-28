createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("💩", { name: "flakes", font: "24px Arial" });

    autoTimedTexts(`
        GIORNATA DELLO SPONSOR
        *
        Hai parenti fastidiosi?
        L'embolo ti salta facilmente con i tuoi cari?
        Pensi di andare al brico a comprarti un lanciafiamme per risolvere le diatribe familiari?
        *
        Da oggi puoi dire addio a tutti questi problemi
        *
        L'agenzia "Il parente buono SRL" ti offre la soluzione
        *
        Chiamaci, e ti metteremo a disposizione i migliori agenti,
        e possiamo fornirti un servizio che,
        con la più assoluta discrezione e professionalità 
        renderà i tuoi parenti docili e pure più simpatici, 
        e tutto nel giro di qualche giorno.
        *
        Devi solo mandarci l'indirizzo e la foto del tuo caro,
        e ci pensiamo noi!
        **
        Mettiti l'animo in pace,
        Con noi i tuoi parenti saranno 'gonfi' d'orgoglio per te!
        *
        "Il parente buono SRL" ti aspetta!
    `, 150)



}