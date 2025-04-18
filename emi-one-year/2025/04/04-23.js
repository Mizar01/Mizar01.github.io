createPhaserGame(_create);

function _create() {

    setBgColor("#000000");

    createSnowflakes2(0x0000aa);

    autoTimedTexts(`
        Strufi e il bosco stregato
        Capitolo 7**
        *
        “Chi osa disturbarmi?” - ripetè la voce.
        “Mi chiamo Strufi” - disse timidamente l’orsetto. - “Sono venuto qui perché gli animali del bosco sono scomparsi e una donna brutta su di una scopa elettrica ha portato via il mio amico”.
        “Capisco!... temevo che prima o poi sarebbe successo” disse la voce.
        Una grossa chiocciola uscì dall’oscurità. Aveva una folta barba bianca e un cappello a cono in testa, con le antenne che sbucavano fuori da due buchi nel cappello.
        “Sono Bagustor, un tempo grande mago, ma ora me ne sto qui a prendere l’umidità delle cascate per colpa della mia sinusite cronica, mi fa bene”.
        “Tu sai cos’è successo?” domandò più deciso Strufi.
        “È certamente opera di Tunguska. Solo lei ha un tale potere.”.
        “E noi cosa possiamo fare?”
        “Niente. È troppo potente. Stiamo a vedere, io da qui non mi posso allontanare, se vuoi c’è un po’ di spazio”.
        Strufi prese coraggio: “Non possiamo aspettare, ha promesso di farci sparire tutti nessuno escluso, e penso che il suo piano non si fermi qui. Tu sei un mago, aiutami!”
        “Sono un mago si, ma conosco bene i suoi poteri, e io da tanto tempo non pratico. Non riesco nemmeno a far sparire una moneta nel mio muco”.
        “Come fai a conoscere i suoi poteri?”
        “È semplice, è mia sorella.”
        “Ma tu sei una lumaca!”
        “No, lei mi ha trasformato in lumaca, tanti anni fa!”
    `);

}