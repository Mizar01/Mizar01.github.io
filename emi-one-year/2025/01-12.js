createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("😱", { name: "flakes", font: "24px Arial" });

    _textCenteredWhite1(`
        L'ANGOLO DELLE CURIOSITÀ

         Oggi si festeggia il Vivekananda Jayanti, o giorno della gioventù,
         giorno in cui nacque Swami Vivekananda, monaco induista e filosofo,
         e capo dei discepoli del mistico Ramakrishna.
    `)



}