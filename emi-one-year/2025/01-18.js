createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("?", { name: "flakes", font: "24px Arial", fill: "#ffaa00" });

    autoTimedTexts(`
        L'ANGOLO DELLE CURIOSITÀ
        *
        Le Yakshinis o Yakshis sono una classe di spiriti naturali femminili nelle mitologie indiane, distinte da Deva, Asura, Gandharva o Apsara. 
        Le Yakshinis e i loro corrispettivi maschili, i Yaksha, sono entità paranormali associate ai sacri boschetti secolari dell'India. 
        Le Yakshis compaiono anche nelle leggende tradizionali delle tribù del nord-est dell'India, nelle leggende del Kerala e nei racconti popolari in Kashmir.
    `, 150)

}