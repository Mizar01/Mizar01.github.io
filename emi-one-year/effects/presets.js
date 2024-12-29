function default1(testo) {

    createPhaserGame(_create);

    function _create() {
        _text1(testo);
    }

}

function fire1(testo) {

    createPhaserGame(_create);

    function _create() {
        _text1(testo);
        createFireEffect({
            percX: 50,
            percY: 85,
            initialScale: 8,
        });

    }

}

function floatingHearts1(testo) {

    createPhaserGame(_create);

    function _create() {
        _text1(testo);
        createFloatingUpHearts();
    }

}

function fireworks1(testo) {
    
    createPhaserGame(_create);

    function _create() {
        getScene().cameras.main.setBackgroundColor("#000000");
        createText(`
            ${testo}
        `, 
        {
            color: '#ffffff',
            customProps:{
                percX: 15, 
                percY: 25,
                effect: 'typewriter',
                effectProps: {
                    delay: 50,
                },
            },
        });
        createFireworks();
    }

}

function _text1(testo) {

    createText(`
        ${testo}
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

}