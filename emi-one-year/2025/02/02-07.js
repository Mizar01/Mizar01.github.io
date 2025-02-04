createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("💩", { name: "flakes", font: "24px Arial" });

    autoTimedTexts(`
        GIORNATA DELLO SPONSOR
        *
        Il tuo ragazzo non si lava?
        Senti odori molesti quando ti avvicini alle sue ascelle?
        Ti si arriccia il naso quando si toglie le scarpe?
        *
        Aspetta, non lasciarlo, un'altra soluzione c'è
        *
        Usa PUZZONSPLAT, il gel deodorante anti odore
        PUZZONSPLAT va spalmato sotto la lingua del tuo partner
        e... dopo aver gridato 3 volte "Altolà al fetore" PUZZONSPLAT entra in azione
        *
        Segui le avventure di PUZZONSPLAT sul nostro canale tiktok.
        Se metti mi piace potresti vincere una confezione di PUZZONSPLAT ogni mese per un anno.
        *
        Il tuo ragazzo non sarà più lo stesso! con PUZZONSPLAT

    `, 150)



}