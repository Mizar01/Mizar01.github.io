createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("😆", { name: "flakes", font: "24px Arial" });

    autoTimedTexts(`
        RUBRICA DEL RIDI RIDI
        *
        Cosa fa un giocoliere sui trampoli?
        Un passo avanti
        *
        Quando la Emi dice che è ora di andare a letto, cosa si deve fare?
        Fare il bravo
        *
        Pitagora va col figlio Teo in barca e dice:
        "Teo rema!"
        *
        Ma secondo te quelli di Trieste sono felici?
        No, sono un po' triestini
        *
        E per finire...
        *
        Cosa fa una zanzara durante l'apericena?
        Ciuccia un po' di sang...ria
    `, 150)



}