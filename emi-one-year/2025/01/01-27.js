createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("👰🏼", { name: "flakes1", font: "24px Arial", frequency: 1000, quantity: 1 });
    createTextSnowFlakes("🤵🏻", { name: "flakes2", font: "24px Arial", frequency: 1000, quantity: 1 });

    autoTimedTexts(`
        Rubrica Locations
        *
        A4 SUPERWEDDING AUTOGRILL
        *
        Ci si arriva velocemente tramite l'A4, da entrambe le direzioni
        Questa location è ben più di un autogrill
        *
        250 € a persona
        Bagni puliti ogni 20 minuti
        Ampio parcheggio
        Panorama montano
        Piano rialzato interno con ampio spazi per la band
        Piatti caldi e freddi
        Brioche sempre pronte in qualsiasi momento
        Toblerone a volontà per i bambini
        Salami nostrani e pasta IGP per i più esigenti
        Come bomboniere vi proponiamo
        L'Arbre Magique alla vaniglia, per un dolce rientro a casa.
    `, 100)



}