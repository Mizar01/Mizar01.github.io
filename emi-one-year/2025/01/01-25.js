createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("💊", { name: "flakes", font: "24px Arial" });

    autoTimedTexts(`
        GIORNATA DELLO SPONSOR
        *
        Ti senti stanca e affaticata?
        Hai quel prurito là non dove non batte il sole?
        Vorresti avere più voglia?
        *
        Nessun problema
        *
        È arrivato SGUBRORZ, l'integratore alimentare a base di vaffanculina
        che facilità il mandare tutti in una stanzetta munita di servizi sanitari per espletare i loro bisogni.
        rendendoti più libera e indipendente
        *
        Prendi la pastiglia, la tua nuova vita inizia da SGUBRORZ

    `, 150)



}