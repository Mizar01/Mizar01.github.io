createPhaserGame(_create,);

function _create() {

    createText(`
        Regina di cuori,
        non dai mai il due di picche,
        attacchiamo i nostri quadri,
        e piantiamo dei fiori.
    `, 
    {
        customProps:{
            percX: 15, 
            percY: 25,
            effect: 'typewriter',
            effectProps: {
                delay: 50,
            },
        },
    });
    // createFireEffect({
    //     percX: 50,
    //     percY: 85,
    //     initialScale: 8,
    // });

    createFloatingUpHearts();



    

}