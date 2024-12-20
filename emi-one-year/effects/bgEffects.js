function createCanvas() {

    // Occupy the full page
    var canvas = document.createElement('canvas');
    canvas.width = getBodySize().width;
    canvas.height = getBodySize().height;
    canvas.style.top = 0;
    canvas.style.left = 0;
    document.body.appendChild(canvas);

    function checkAndResizeCanvas() {
        const {width, height} = getBodySize();

        console.log('checkAndResizeCanvas', width, height);
        
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

    return canvas.getContext('2d');

}

function createPhaserGame(create, update) {

    // Use phaser.js to create a fire effect
    const {width, height} = getBodySize();

    const config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        transparent: true,
        scene: {
            create: create,
            update: update
        }
    };

    const game = new Phaser.Game(config);

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

        // Create a graphics object to generate a circle-shaped particle texture
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(5, 5, 5); // Center (5, 5), Radius: 5
        graphics.generateTexture('fireParticle', 10, 10); // Texture size: 10x10
        graphics.destroy(); // Clean up the graphics object
    
        const { width, height } = this.game.config;

        const percX = props?.percX || 50;
        const percY = props?.percY || 50;
        const initialScale = props?.initialScale || 4;

        // Add particles using the generated texture
        const particles = this.add.particles(width / 100 * percX, height / 100 * percY, 'fireParticle', {
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

    function update() {
        // No need to update anything
    }

}


function fireworks(props) {

    createPhaserGame(create, update);

    // Create a fire emitter with only geometry shapes (no loading of images)

    function create() {

        // Create particles to make a firework effect

        // Create a graphics object to generate a circle-shaped particle texture
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(5, 5, 5); // Center (5, 5), Radius: 5
        graphics.generateTexture('firework', 10, 10); // Texture size: 10x10
        graphics.destroy(); // Clean up the graphics object

        this.time.addEvent({
            delay: 300, // Launch every 500ms
            callback: () => {
                const {width, height} = this.game.config;
                const [x, y] = [Math.random() * width, Math.random() * height];
                createFirework(x, y, this);
            },
            loop: true
        });
        
        
    }
    
    function createFirework(x, y, scene) {

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

    function update() {}

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