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

}

function createSnowFlakes() {

    createCanvas();

    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
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

function getBodySize() {
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
    };
}