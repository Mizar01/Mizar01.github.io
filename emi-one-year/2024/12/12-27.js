createPhaserGame(_create,);

function _create() {

    createText('Il posto più bello del mondo è qui e ora', {
        customProps: {
            percX: 15, 
            percY: 45,
            effect: 'typewriter',
    }});
    createFireEffect({
        percX: 50,
        percY: 75,
        initialScale: 8,
    });

    

}