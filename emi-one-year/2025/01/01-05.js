createPhaserGame(_create, null, _preload);

function _preload() {
    this.load.audio('audio1', '2025/01/01-05.aac');
}

function _create() {

    createText(`
        Un panettone alla volta,
        un panettone alla volta,
        Un panettone alla voltaaaaa,
        Lavanda Gastricà.
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
        fontSize: '32px',
    });
    getScene().cameras.main.setBackgroundColor("#000000");
    createFloatingUpHearts();
    createPlayMusicButton("audio1", 50, 10);

}