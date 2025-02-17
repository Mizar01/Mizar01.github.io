createPhaserGame(_create, null, _preload);

function _preload() {
    this.load.audio('audio1', '2025/02/02-21-nightdreams.mp3');
}

function _create() {

    createText(`
        A spirit in the sky
        fly through the night
        it sleeps and it dreams

        Dreams of endless days
        with kisses everyday
        with kisses everywhere

        Emiliana, on your pillow
        you dream to climb a willow
        reaching for the sun
        and see me on the ground

        Emiliana, I see you there
        come over down to me
        let's stay together
        let's stay forever
    `,
    {
        color: '#ffffff',
        customProps: {
            percX: 15, 
            percY: 15,
            effect: 'typewriter',
            effectProps: {
                delay: 50,
            },
        },
        fontSize: '24px',
    });
    setBgColor("#000000");
    createFloatingUpHearts();
    createPlayMusicButton("audio1", 50, 10);

}