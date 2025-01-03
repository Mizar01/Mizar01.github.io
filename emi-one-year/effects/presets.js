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

function timedTextsWithFireworks1(texts) {

    createPhaserGame(_create);

    function _create() {

        let scene = getScene();

        scene.cameras.main.setBackgroundColor("#000000");
        
        createFireworks();

        createTimedTexts(texts);



    }

}

function createTimedTexts(texts, props) {

    const textProps = {
        color: props?.color || '#ffffff',
        customProps: {
            percX: props?.customProps?.percX || 15, 
            percY: props?.customProps?.percY || 25,
        },
    };

    let t = createText(``, textProps);
    let idx = 0;
    const evt = getScene().time.addEvent({
        delay: 20,
        callback: () => {
            t.text = texts[idx].text;
            evt.delay = texts[idx]?.time || 1000;
            // Stop when text is empty, remove only this event
            if (idx === texts.length - 1) {
                evt.remove();
            }
            idx++;
        },
        loop: true,
    });
}