createPhaserGame(_create, );

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    createTextSnowFlakes("🏃🏼‍♀️", { name: "flakes", font: "24px Arial", frequency: 1000, quantity: 1, });

    autoTimedTexts(`
        GIORNATA DELLO SPONSOR
        *
        Stanca del solito viaggio in treno?
        *
        Due ore complete di noia e col wifi che va e che viene?
        *
        Sentire sempre questi messaggi noiosi sulle stazioni intermedie tra Milano e Padova?
        *
        Non darti per vinta,
        Da oggi c'è TRAMPOMILANO,
        *
        In collaborazione con quei campagnoli di Padova, Milano ha realizzato questa meraviglia.
        Vieni anche tu a provare il più grande tappeto elastico del mondo,
        Gettati anche tu, dalla strabiliante altezza di 250 metri, su questo enorme tappeto,
        e verrai catapultato nella tua città preferita in pochi secondi.
        *
        Ti aspettiamo
        *
        PS: Leggere attentamente le avvertenze, dotarsi di paracadute, caschetto, cavigliere rinforzate, giubbetto parabrezza, occhiali per l'aria, lucetta d'emergenza, assicurazione, santini (almeno 2).
    `, 150)



}