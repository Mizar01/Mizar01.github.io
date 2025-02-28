createPhaserGame(_create);

function _create() {

    setBgColor("#000000");

    createTextSnowFlakes("🌛", {frequency: 500, quantity: 1});

    autoTimedTexts(`
        Shamana Pigiama e il tortellino nero
        Capitolo 1**
        *
        I glitter del pigiamino a stelle di Shamana Pigiama brillavano, illuminati dal sole che filtrava dalle finestre della pasticceria.
        Davanti a lei c'era il suo dolce preferito per la colazione: la formosa Wendy.
        Si trattava di un krapfen rosa pralinato, ripieno di cioccolata e krauti.
        Solitamente lo mangiava tutti i giorni, ma da qualche settimana aveva cominciato a mangiarne di meno, 
        dopo che la bilancia Filomena aveva dato di matto quando c'era salita sopra.
        Persino Amelia la pasticcera si era intristita e pensava addirittura di non essere più capace di fare i krapfen.
        Quel giorno Shamana aveva tentato di confortarla, spiegandole che la bilancia Filomena si sarebbe arrabbiata molto se avesse sgarrato.
        Il resto della giornata trascorse sereno per Shamana, a parte quando si ruppe Carla, la stampante.
        Al lavoro non si parlava d'altro della scomparsa di molti animali nel bosco alla periferia della città...
    `);

}