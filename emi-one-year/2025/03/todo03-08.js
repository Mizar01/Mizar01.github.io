createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("👰🏼", { name: "flakes1", font: "24px Arial", frequency: 1000, quantity: 1 });
    createTextSnowFlakes("🤵🏻", { name: "flakes2", font: "24px Arial", frequency: 1000, quantity: 1 });

    autoTimedTexts(`
        Rubrica Locations*
        *
        
    `, 170)



}