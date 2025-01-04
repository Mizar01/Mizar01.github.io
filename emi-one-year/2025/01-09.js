createPhaserGame(_create,);

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");
    // purple snowflakes
    createTextSnowFlakes("❄️", {name: "hearts", font: "12px Arial"});

    _textCenteredWhite1(`
        L'ANGOLO DELLE CURIOSITÀ

        L'albero di Natale ha origini antichissime.
        
        Nel nord Europa si celebrava il solstizio d'inverno 
        bruciando il ceppo di Yule.
        Nell'antica roma festeggiavano le Saturnali,
        decorando gli edifici con rami di sempreverde.
    `)

}