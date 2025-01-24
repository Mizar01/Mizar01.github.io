createPhaserGame(_create,);

function _create() {

    createText(`
        La terra è tonda,
        la terra è piatta,
        chi lo sa?
        Se ti cercassi fino ai quattro angoli della terra direi che è piatta.
        Se ti cercassi dall'altra parte del mondo direi che è tonda.
        Ma una cosa è certa: ti troverò 😜
    `, 
    {
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

    createFloatingUpHearts();



    

}