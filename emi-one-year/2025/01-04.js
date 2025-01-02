createPhaserGame(_create,);

function _create() {

    createText(`
        Vorrei che non perdessimo mai 
        la capacità di insegnarci l'un l'altro, 
        di crescere insieme,
        di volerci e ascoltarci.
    `, 
    {
        color: '#ffffff',
        customProps: {
            percX: 15, 
            percY: 15,
            effect: 'typewriter',
            effectProps: {
                delay: 150,
            },
        },
        fontSize: '32px',
    });
    getScene().cameras.main.setBackgroundColor("#000000");
    createFloatingUpHearts();

}