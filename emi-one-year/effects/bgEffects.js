var game;
var canvasContext;

function getScene() { return game.scene.scenes[0]; }

function createCanvas() {

    if (canvasContext !== undefined) {
        return canvasContext;
    }

    // Occupy the full page
    canvas = document.createElement('canvas');
    canvas.width = getBodySize().width;
    canvas.height = getBodySize().height;
    canvas.style.top = 0;
    canvas.style.left = 0;
    document.body.appendChild(canvas);

    function checkAndResizeCanvas() {
        const {width, height} = getBodySize();

        // console.log('checkAndResizeCanvas', width, height);
        
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
    }

    window.addEventListener('resize', checkAndResizeCanvas);
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                checkAndResizeCanvas();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    canvasContext = canvas.getContext('2d');
    return canvasContext;

}

function createPhaserGame(create, update, preload) {

    if (game !== undefined) {
        return game;
    }

    // Use phaser.js to create a fire effect
    const {width, height} = getBodySize();

    const config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        transparent: true,
        scene: {
            preload: preload || function() {},
            create: create,
            update: update || function() {},
        }
    };

    game = new Phaser.Game(config);

    return game;

}

function getBodySize() {
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
    };
}

function fire(props) {

    createPhaserGame(create, update);

    // Create a fire emitter with only geometry shapes (no loading of images)

    function create() {
        createFireEffect(props);
    }

    function update() {
        // No need to update anything
    }

}

function createFireEffect(props) {

    const scene = getScene();

    // Create a graphics object to generate a circle-shaped particle texture
    const graphics = scene.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(5, 5, 5); // Center (5, 5), Radius: 5
    graphics.generateTexture('fireParticle', 10, 10); // Texture size: 10x10
    graphics.destroy(); // Clean up the graphics object

    const { width, height } = scene.game.config;

    const percX = props?.percX || 50;
    const percY = props?.percY || 50;
    const initialScale = props?.initialScale || 4;

    // Add particles using the generated texture
    const particles = scene.add.particles(width / 100 * percX, height / 100 * percY, 'fireParticle', {
        speed: props?.speed || { min: 70, max: 180 },
        angle: props?.angle || { min: -50, max: -130 },
        scale: { start: initialScale, end: 0 },
        alpha: { start: 0.38, end: 0.1 },
        lifespan: 2800,
        blendMode: 'ADD',
        frequency: 20,
        tint: [0xff4511, 0xffa511, 0xffff11] // Fire colors
    });

    return particles;

}



function fireworks(props) {

    createPhaserGame(create, update);

    function create() {
        createFireworks();
    }

    function update() {}

}

function createFireworks() {

    // Create particles to make a firework effect

    const scene = getScene();

    // Create a graphics object to generate a circle-shaped particle texture
    const graphics = scene.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(5, 5, 5); // Center (5, 5), Radius: 5
    graphics.generateTexture('firework', 10, 10); // Texture size: 10x10
    graphics.destroy(); // Clean up the graphics object

    scene.time.addEvent({
        delay: 300, // Launch every 500ms
        callback: () => {
            const {width, height} = scene.game.config;
            const [x, y] = [Math.random() * width, Math.random() * height];
            buildFirework(x, y, scene);
        },
        loop: true
    });

    function buildFirework(x, y, scene) {

        scene.add.particles(x, y, 'firework', {
            speed: { min: 150, max: 500 }, // Varying speed for the explosion
            angle: { min: 0, max: 360 }, // Emit particles in all directions
            scale: { start: 1, end: 0 }, // Particles shrink over time
            alpha: { start: 1, end: 0 }, // Particles fade out
            lifespan: 1000, // Particles last for 1 second
            blendMode: 'ADD', // Additive blending for glowing effect
            gravityY: 800, // Gravity to make particles fall back down
            stopAfter: 30, // Stop emitting particles after x particles
            tint: [0xff0000, 0xffa500, 0xffff00, 0x00ff00, 0x0000ff, 0xff00ff]
        });

    }

}


function snowflakes() {

    var ctx = createCanvas();
    var flakes = [];
    var maxFlakes = 400;

    function createFlake() {
        if (flakes.length >= maxFlakes) {
            return;
        }
        var x = Math.random() * getBodySize().width;
        var y = 0;
        var size = Math.random() * 3 + 2;
        var speed = Math.random() * 3 + 1;
        flakes.push({x: x, y: y, size: size, speed: speed});
    }

    function drawFlakes() {
        let {width, height} = getBodySize();
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'white';
        flakes.forEach(function (flake) {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y += flake.speed, flake.size, 0, Math.PI * 2);
            ctx.fill();
            if (flake.y > height) {
                flake.y = 0;
                flake.x = Math.random() * width;
            }
        });
    }

    setInterval(function () {
        createFlake();
        drawFlakes();
    }, 1000 / 40);

}

// Phaser version of snowflakes
function createSnowflakes2(color, imageFn, imageName) {
    
    color = color || 0xffffff;

    const scene = getScene();

    imageName = imageName || 'snowflake';
    imageFn = imageFn || function () {

        const graphics = scene.add.graphics();
        graphics.fillStyle(color, 1);
        graphics.fillCircle(5, 5, 5); // Center (5, 5), Radius: 5
        graphics.generateTexture(imageName, 10, 10); // Texture size: 10x10
        graphics.destroy(); // Clean up the graphics object

    };

    imageFn();

    const { width, height } = scene.game.config;
    
    const p = scene.add.particles(0, 0, imageName, {
        x: { min: 0, max: width },      // Horizontal range
        y: 0,                         // Starting y-position (top of the screen)
        lifespan: 5000,               // Time the particles last (ms)
        speedY: { min: 50, max: 200 },// Vertical speed (falling speed)
        scale: { start: 2, end: 1 }, // Snowflakes shrink as they fall
        alpha: { start: 1, end: 0.5 },  // Fade out as they fall
        quantity: 2,                  // Number of particles released per interval
        frequency: 50,                // Interval (ms) between releases
        rotate: { min: 0, max: 360 }, // Rotation for variation
        blendMode: 'ADD'              // Blending mode for a nice effect
    });

    p.setDepth(-1);

    return p;
}

function createTextSnowFlakes(text, props) {
    let font = props?.font || '32px Arial';
    let fill = props?.fill || '#ffffff';
    let name = props?.name || 'textSnowflake';
    const tsn = createSnowflakes2(null, () => {
        const t = getScene().add.text(-100, -100, text, {font: font, fill: fill,});
        const renderTexture = getScene().add.renderTexture(-100, -100, t.width, t.height);
        renderTexture.draw(t, 0, 0);
        renderTexture.saveTexture(name);
        t.destroy();
    }, name);
    return tsn;
}


function createText(text, textStyle) {

    const scene = getScene();

    const percX = textStyle?.customProps?.percX || 20;
    const percY = textStyle?.customProps?.percY || 50;
    const effect = textStyle?.customProps?.effect;

    const { width, height } = getBodySize();

    text = text.trim();

    textStyle = {
        fontFamily: textStyle?.fontFamily || "Arial",
        fontStyle: textStyle?.fontStyle || "bold",
        align: 'center',
        fontSize: textStyle?.fontSize || '36px',
        color: textStyle?.color || '#000000',
        wordWrap: {
            width: width * 0.8, // Maximum width of the text block
            useAdvancedWrap: true // Allows advanced word wrapping
        },
        customProps: textStyle?.customProps,
    };

    let t;

    if (effect === 'typewriter') {

        t = scene.add.text(width / 100 * percX, height / 100 * percY, '', textStyle);
        const evt = scene.time.addEvent({
            delay: textStyle?.customProps?.effectProps?.delay || 180, 
            callback: () => {
                t.text += text[0];
                text = text.substring(1);
                // Stop when text is empty, remove only this event
                if (text.length === 0) {
                    evt.remove();
                }
            },
            loop: true,
        });


    } else {
        t = scene.add.text(width / 100 * percX, height / 100 * percY, text, textStyle);
    }

    return t;
}

function createFloatingUpText(text) {

    const scene = getScene();
    const { width, height } = getBodySize();

    const floatings = [];
    const maxFloats = 40;
    const genFloatEvt = scene.time.addEvent({
        delay: 1000,
        callback: () => {
            const flt = scene.add.text(Math.random() * width - 5, height + 30, text, {
                font: '48px Arial',
                fill: '#ffffff'
            });
            flt.centerX = flt.x;
            floatings.push(flt);
            if (floatings.length > maxFloats) {
                // Stops generating floatings
                genFloatEvt.remove();
            }
        },
        loop: true,
    })

    const moveHeartsEvt = scene.time.addEvent({
        delay: 20,
        callback: () => {
            floatings.forEach(flt => {
                //console.log("heart centerX", hearts[0].centerX);
                flt.y -= 4 * Math.random();
                flt.x = flt.centerX + 10 * Math.sin(flt.y / 10);
                if (flt.y < -30) {
                    flt.y = height + 30;
                    flt.x = flt.centerX;
                }
            });
        },
        loop: true,
    });
}


function createFloatingUpHearts() {
    createFloatingUpText('❤️');
    
}

function createTextButton(text, {x, y, onClick}) {
    var button = getScene().add.text(x, y, text, {
        color: '#ffffff',
        backgroundColor: '#444444',
        padding: {
            x: 10,
            y: 5,
        },
    }).setOrigin(0.5); // Centered text
    button.setInteractive();
    button.on('pointerdown', onClick);
    return button;
}

function createPlayMusicButton(audio, percX, percY) {

    var music = getScene().sound.add(audio);
    var playButton = createTextButton('Play Audio', {
        x: getBodySize().width / 100 * percX,
        y: getBodySize().height / 100 * percY,
        onClick: () => {
            if (!music.isPlaying) {
                music.play();
            }
        },
    });

}

function setBgColor(color) {
    getScene().cameras.main.setBackgroundColor(color);
}

// Note: all texts are centered
function createTimedTexts(texts, props) {

    const textProps = {
        color: props?.color || '#ffffff',
        customProps: {
            percX: props?.customProps?.percX || 50, 
            percY: props?.customProps?.percY || 50,
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

/**
 * Special chars at the end of a line: 
 *    *: 10 times the waitChar time
 *    **: 20 times the waitChar time
 * @param {*} text 
 * @param {*} waitChar 
 */
function autoTimedTexts(text, waitChar=100) {

    function getTextAndCustomTime(t) {
        if (t.endsWith("**")) {
            t = t.substring(0, t.length - 2);
            return [t, (20 + t.length) * waitChar];
        } else if (t.endsWith("*")) {
            t = t.substring(0, t.length - 1);
            return [t, (10 + t.length) * waitChar];
        } else {
            return [t, t.length * waitChar];
        }
    }
    // tokenize the text and call createTimedTexts
    const tokens = text.split('\n').map(t => t.trim()).filter(t => t.length > 0);
    const texts = tokens.map(t => {
        const [tFinal, time] = getTextAndCustomTime(t);
        return {text: tFinal, time: time};
    });
    createTimedTexts(texts);
}