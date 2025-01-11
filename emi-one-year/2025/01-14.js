createPhaserGame(_create);

function _create() {

    setBgColor("#000000");

    let s1 = createSnowflakes2(0x800080);
    
    let t1 = this.time.addEvent({
        delay: 60000,
        callback: () => {
            s1.destroy();
            createSnowflakes2(0xff0000);
            t1.remove();
        },
        loop: false,
    });

    autoTimedTexts(`
        Strufi e il bosco stregato
        Capitolo 2

        Il castoro Guglielmino, con i suoi occhialoni spessi, sbirciò dentro la casetta di Strufi, il quale ronfava della grossa.
        Il castoro bussò forte alla porta dell'orsetto.
        "Ftrufi! Ftrufi! Fvegliati! È Fucceffa una cofa fpaventofa!"
        Quel grido svegliò di colpo l'orsetto. Strufi risucchiò la bava che gli colava dalla bocca e si stropicciò gli occhi.
        "Oh Guglielmino, che succede?"
        "Non lo fo, ma è terribile! Vieni a vedere!"
        Strufi capì che doveva andare di persona.
        Come nel sogno che aveva fatto c'era la neve, ma era rossa, e non era un sogno.
    `);

}