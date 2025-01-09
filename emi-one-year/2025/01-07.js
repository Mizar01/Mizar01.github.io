createPhaserGame(_create,);

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");
    // purple snowflakes
    createSnowflakes2(0x800080);

    createTimedTexts([
        {text: "Strufi e il bosco stregato", time: 3000},
        {text: "Capitolo 1", time: 5000},
        {text: "Strufi, l'orsetto piccino picciò, dormiva beato durante l'inverno.", time: 4000},
        {text: "Ma, in una notte buia e tempestosa, fece un sogno funesto.", time: 4000},
        {text: "Tutti gli animali della foresta erano spariti, e una lugubre neve violacea copriva alberi e cespugli", time: 4000},
        {text: `
            Strufi si svegliò di soprassalto, ma poi vide il vasetto di miele, ne assaggiò un po' e si addormentò di nuovo.
            [continua...]
        `, time: 7000},
    ])

}