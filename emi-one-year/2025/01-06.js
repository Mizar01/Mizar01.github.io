createPhaserGame(_create,);

function _create() {

    createText(`
        L'Emiliana vien di notte

        con le scarpe tutte rosse

        col cappello pien di paglia
        
        viva viva la sua boscaglia.
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

}