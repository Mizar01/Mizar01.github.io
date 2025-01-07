function default1(testo) {

    createPhaserGame(_create);

    function _create() {
        _text1(testo);
    }

}

function fire1(testo) {

    createPhaserGame(_create);

    function _create() {
        getScene().cameras.main.setBackgroundColor("#000000");
        _textCenteredWhite1(testo);
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

function _textCenteredWhite1(testo) {

    const t = createText(`
        ${testo}
    `, 
    {
        customProps:{
            percX: 50, 
            percY: 50,
            effect: 'typewriter',
            effectProps: {
                delay: 50,
            },
        },
        color: '#ffffff',
        fontSize: "24px",
    });

    t.setOrigin(0.5);

    return t;

}




function _text1(testo) {

    const t = createText(`
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

    return t;

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

// Note: all texts are centered
function createTimedTexts(texts, props) {

    const textProps = {
        color: props?.color || '#ffffff',
        customProps: {
            percX: props?.customProps?.percX || 50, 
            percY: props?.customProps?.percY || 25,
        },
    };

    let t = createText(``, textProps).setOrigin(0.5);
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