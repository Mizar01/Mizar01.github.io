createPhaserGame(_create,);

function _create() {

    createText(`
        Sul divano sotto una coperta, 
        sul letto baciati dal sole, 
        la nostra casetta 
        perfetto nido d'amore
    `, 
    {
        customProps: {
            percX: 15, 
            percY: 25,
            effect: 'typewriter',
            effectProps: {
                delay: 50,
            },
        },
    });
    createFireEffect({
        percX: 50,
        percY: 85,
        initialScale: 8,
    });

    

}