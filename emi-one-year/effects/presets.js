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

function fireCircular1(testo, {
    centerPercX = 50,
    centerPercY = 50,
    count = 8,
    radiusPerc = 70,
    fireScale = 4,
    colors = ["#ff0000", "#ff6600", "#ffcc00", "#00ff00"],
    rotSpeed = 0.05,
} = {}) {
    
    createPhaserGame(_create);

    function _create() {

        const { width, height } = getScene().game.config;
        const factorX = width / 100;
        const factorY = height / 100;
        const factor = Math.min(factorX, factorY);

        setBgColor("#000000");

        _textCenteredWhite1(testo);

        const centerX = centerPercX * factorX;
        const centerY = centerPercY * factorY;
        fires = [];
        for (let i = 0; i < count; i++) {
            let angle = i * (Math.PI * 2) / count;
            let p1 = createFireEffect({
                percX: 0, percY: 0,
                initialScale: fireScale,
                colors: colors,
            });
            p1.x = centerX + Math.cos(angle) * radiusPerc * factor;
            p1.y = centerY + Math.sin(angle) * radiusPerc * factor;
            p1.posAngle = angle;
            fires.push(p1);
        }
        getScene().time.addEvent({
            delay: 20,
            callback: () => {
                for (let i = 0; i < count; i++) {
                    let angle = fires[i].posAngle + 0.01;
                    fires[i].x = centerX + Math.cos(angle) * radiusPerc * factor;
                    fires[i].y = centerY + Math.sin(angle) * radiusPerc * factor;
                    fires[i].posAngle = angle;
                }
            },
            loop: true,
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

function fireworksWithAutoTimedText1(text, ratio = 300) {
    
    createPhaserGame(_create);

    function _create() {
        getScene().cameras.main.setBackgroundColor("#000000");
        createFireworks();
        autoTimedTexts(text, ratio);
    }

}

function floatingHeartsWithAutoTimedText1(text, ratio = 150) {

    createPhaserGame(_create);

    function _create() {
        setBgColor("#000000");
        createFloatingUpHearts();
        autoTimedTexts(text, ratio);
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

function fireWithAutoTimedText1(text, ratio = 300) {

    createPhaserGame(_create);

    function _create() {

        let scene = getScene();

        setBgColor("#000000");

        createFireEffect({
            percX: 50,
            percY: 85,
            initialScale: 8,
        });

        autoTimedTexts(text, ratio);
        
    }
}

function fireWithManualText1(text) {

    createPhaserGame(_create);

    function _create() {

        let scene = getScene();

        setBgColor("#000000");

        createFireEffect({
            percX: 50,
            percY: 85,
            initialScale: 8,
        });

        manualBrowseTexts(text);
        
    }
}

function snowFlakesWithAutoTimedText1(snowFlakeText, text, {
    ratio = 150,
    name = "flakes",
    font = "24px Arial",
    fill = "#ffaa00",
    preloadFn = null,
    afterCreate = null,
} = {}) {
    createPhaserGame(_create, null, preloadFn);

    function _create() {
    
        getScene().cameras.main.setBackgroundColor("#000000");
    
        createTextSnowFlakes(snowFlakeText, { name: name, font: font, fill: fill });
    
        autoTimedTexts(text, ratio);

        afterCreate && afterCreate(this);
    
    }

}

function snowFlakesWithManualText1(snowFlakeText, text, {
    name = "flakes",
    font = "24px Arial",
    fill = "#ffaa00",
    preloadFn = null,
    afterCreate = null,
} = {}) {
    createPhaserGame(_create, null, preloadFn);

    function _create() {
    
        setBgColor("#000000");
    
        createTextSnowFlakes(snowFlakeText, { name: name, font: font, fill: fill });
    
        manualBrowseTexts(text);

        afterCreate && afterCreate(this);
    
    }

}

function moonText1(text) {

    function preloadFn() {
        // Load moon image
        this.load.image('moon', '/assets/img/moon.png');
    }
    
    function afterCreate(scene) {
    
        const { width, height } = scene.sys.game.canvas;
        // Add moon image attached to a container
        const moonContainer = scene.add.container(width / 2, height + 200);
        const img = scene.add.image(0, - height / 6 * 5, 'moon');
        moonContainer.add(img);
        //img.setScale(0.5);
        moonContainer.setDepth(-100);
        moonContainer.setAlpha(0.5);
        moonContainer.setAngle(-50);
    
        scene.time.addEvent({
            delay: 50,
            callback: () => {
               moonContainer.setAngle(moonContainer.angle + 0.05);
            },
            loop: true,
        });
        
    
        
    }
    
    snowFlakesWithAutoTimedText1(".", text, {
        ratio: 400, 
        fill: "#ffffff",
        preloadFn: preloadFn,
        afterCreate: afterCreate,
    });
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

function audioWithText1(audioPath, text) {

    createPhaserGame(_create, null, _preload);

    function _preload() {
        this.load.audio('audio1', audioPath);
    }

    function _create() {

        createText(`
            ${text}
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
            fontSize: '24px',
        });
        setBgColor("#000000");
        createFloatingUpHearts();
        createPlayMusicButton("audio1", 50, 10);

    }
}

