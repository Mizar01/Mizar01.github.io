createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("💩", { name: "flakes", font: "24px Arial", frequency: 1000, quantity: 1, });

    autoTimedTexts(`
        GIORNATA DELLO SPONSOR
        *
        Ti sei fatta un bel viaggio in un paese lontano e misterioso?
        Hai mangiato cibi esotici in mezzo a persone poco pulite?
        Ti ritrovi con la pancia dolorante e un rubinetto al posto del culo?
        *
        Non preoccuparti! Succede, è la vita!
        Ma se non vuoi che la vita sia un rubinetto di merda,
        Prendi STOPSQUARAUS!
        *
        Con STOPSQUARAUS la vita ti sorriderà di nuovo,
        Tutto tornerà solido e compatto, soddisfatti o rimborsati!
        *
        Ordina STOPSQUARAUS in farmacia o dietro la stazione,
        Lo trovi in comodi blister da 125 supposte o 5 flaconi inalabili da 1 litro.
        *
        Attenzione: non superare le dosi consigliate, non adatto a bambini sotto i 12 anni, non adatto a chi ha peli sulle cosce.
        Se si verificano eruzione cutanee o morte, consultare il medico.
    `, 150)



}