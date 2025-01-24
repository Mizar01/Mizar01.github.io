createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("?", { name: "flakes", font: "24px Arial", fill: "#ffaa00" });

    autoTimedTexts(`
        L'ANGOLO DELLE CURIOSITÀ
        *
        Isaac Newton, è stato uno dei più grandi scienziati che il mondo ricordi, 
        ma trovo il tempo anche per dedicarsi all'alchimia e agli studi esoterici, 
        cercando di decifrare codici nascosti nella Bibbia.
    `, 80)

}