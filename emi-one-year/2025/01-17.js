createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("😆", { name: "flakes", font: "24px Arial" });

    autoTimedTexts(`
        RUBRICA DEL BUONUMORE
        *
        Perché Picasso era povero?
        perché i conti non quadravano
        *
        Che cosa fa un elefante sopra ad un nano?
        Schiaccia un pisolo
        *
        Cosa fa la Emi a canto?
        Fa aria dall'altra parte
        *
        Sai perché l'ultima barzelletta non fa ridere?
        Perché sei la Emi
        *
        E per finire...
        *
        Perché le zanzare sono solo in veneto?
        Perché buon vino fa buon sangue
    `, 150)



}