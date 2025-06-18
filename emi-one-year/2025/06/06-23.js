createPhaserGame(_create);

function _create() {

    setBgColor("#000000");

    createSnowflakes2(0x0000aa);

    autoTimedTexts(`
        Strufi e il bosco stregato
        Capitolo 8**
        *
        “È una lunga storia!”, cominciò Bagustor, “Tunguska è sempre stata molto scontrosa fin da giovane e a dirla tutta mi invidiava”
        “La nostra sorellina più piccola, Amy, legava molto più con me che con lei, e man mano che crescemmo Tunguska si pose in atteggiamento di conflitto nei nostri confronti”.
        “I nostri genitori ci iscrissero alla scuola di Alchimia magica, io e Tunguska avevamo ottimi voti ed eravamo sempre in competizione”
        “Quando Amy dovette iniziare anche lei, si propose, nell’idea di acquisire esperienza, di fare da cavia ai nostri esperimenti da maghi più esperti”.
        “Un giorno sorpresi Tunguska far bere ad Amy un intruglio di foglie secche e guano di pipistrello, per farla vomitare su di un gatto morto e farlo resuscitare come Zombie”
        “L’incantesimo che Tunguska aveva lanciato sulla pozione era molto potente e all’idea che Amy potesse morire bevendola sbiancai in volto”
        “Cercai di fermare Tunguska, ma lei ordinò ad una pianta senziente di bloccarmi le gambe. Io caddi e allungai le braccia imprecando, ma Amy trangugiò la pozione”
        “Gli occhi di Emy emisero una luce abbagliante e poco dopo cadde tramortita al suolo. Sembrava morta”
        “Seguì una lunga litigata. Tunguska prese una pala e portò Amy in giardino. Poi tornò da me e mi fece bere un’altro intruglio da lei santificato. Ed eccomi qui!”
        Bagustor terminò il suo racconto.
        “Quindi è proprio cattiva cattiva!” disse Strufi un po’ spaventato.
        “Oh puoi ben dirlo! Povera Amy, Tunguska la seppellì in giardino, mi tramutò in lumacone e fuggì, ma quando andai in giardino il corpo era sparito.”
        “E dove può essere andata?”
        “È probabile che si fosse ridestata, ma avesse perso completamente il sennò e si sia messa in cammino in cerca di qualche riparo”.
    `);

}