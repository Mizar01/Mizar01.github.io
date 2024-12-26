createPhaserGame(_create,);

function _create() {

    createText(`
        Siamo pronti per uno scopiettante festeggiamento?
        Abbiamo tutto? 
        Abbiamo soprattutto voglia?
        Non è forse meglio...


        CLD
        CLD 
        CLD
        ?


        😴😴😴
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