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