createPhaserGame(_create,);

function _create() {

    createText(`
        (non potevo registrare la canzone quindi immaginala)

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

}