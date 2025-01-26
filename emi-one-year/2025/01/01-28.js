createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("?", { name: "flakes", font: "24px Arial", fill: "#ffaa00" });

    autoTimedTexts(`
        Helena Petrovna Blavatsky fondò la Società Teosofica nel 1875, 
        combinando esoterismo occidentale, spiritualità orientale e misticismo. 
        Scrisse Iside Svelata e La Dottrina Segreta, 
        diffondendo idee su karma, reincarnazione e saggezza occulta. 
        Sosteneva di ricevere insegnamenti da maestri spirituali e influenzò il pensiero esoterico moderno.
    `, 80);

}