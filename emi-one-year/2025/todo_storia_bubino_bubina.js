createPhaserGame(_create,);

function _create() {

    createText(`
        
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
    snowflakes(); // TODO: replace with phaser version when ready.

}