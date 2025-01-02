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
function createSnowflakes2() {
    
    createPhaserGame(create, update);

    function create() {
        
        // TODO: Add snowflakes

    }

    function update() {

        // TODO: Update snowflakes

    }
    
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
        fontStyle: textStyle?.fontStyle || "bold italic",
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

function createFloatingUpHearts() {

    const scene = getScene();
    const { width, height } = getBodySize();

    const hearts = [];
    const maxHearts = 40;
    const genHeartsEvt = scene.time.addEvent({
        delay: 1000,
        callback: () => {
            const heart = scene.add.text(Math.random() * width - 5, height + 30, '❤️', {
                font: '48px Arial',
                fill: '#ffffff'
            });
            heart.centerX = heart.x;
            hearts.push(heart);
            if (hearts.length > maxHearts) {
                // Stops generating hearts
                genHeartsEvt.remove();
            }
        },
        loop: true,
    })

    const moveHeartsEvt = scene.time.addEvent({
        delay: 20,
        callback: () => {
            hearts.forEach(heart => {
                //console.log("heart centerX", hearts[0].centerX);
                heart.y -= 4 * Math.random();
                heart.x = heart.centerX + 10 * Math.sin(heart.y / 10);
                if (heart.y < -30) {
                    heart.y = height + 30;
                    heart.x = heart.centerX;
                }
            });
        },
        loop: true,
    });

}