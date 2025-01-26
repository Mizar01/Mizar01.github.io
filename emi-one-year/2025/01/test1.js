createPhaserGame(_create, _update);

function _create() {

    setBgColor("#000000");

    const { width, height } = this.sys.game.config;

    const areaWidth = 2000;
    const areaHeight = 2000;
    const borders = {
        x1: width / 2 - areaWidth / 2, y1: height / 2 - areaHeight / 2, 
        x2: width / 2 + areaWidth / 2, y2: height / 2 + areaHeight / 2
    };

    this.borders = borders;
    //drawGrid(this);

    this.player = this.add.text(width / 2, height / 2, "😍", {
        font: '48px Arial',
        fill: '#ffffff'
    }).setOrigin(0.5);
    this.player.speedx = 0;
    this.player.speedy = 0;
    this.player.maxSpeed = 0.1;
    
    setJoystickLikeInputs(this);

    // Set camera to follow player
    this.cameras.main.startFollow(this.player);

    this.entities = [];
    // Add random guests
    for (let i = 0; i < 88; i++) {
        const e = addEntity(this, Math.random() * areaWidth + borders.x1, Math.random() * areaHeight + borders.y1, "guest");
        this.entities.push(e);
    }
    // Add random enemies
    for (let i = 0; i < 10; i++) {
        let e = addEntity(this, Math.random() * areaWidth + borders.x1, Math.random() * areaHeight + borders.y1, "enemy");
        this.entities.push(e);
    }

}

function _update() {

    this.player.x += this.player.speedx * this.game.loop.delta;
    this.player.y += this.player.speedy * this.game.loop.delta;

    checkBorders(this, this.player);

    updateEntities(this, this.entities);

}

// TODO: improve
function drawGrid(s) {

    const cx = s.sys.game.config.width / 2;
    const cy = s.sys.game.config.height / 2;
    const halfAreaWidth = (s.borders.x2 - s.borders.x1) / 2;
    const halfAreaHeight = (s.borders.y2 - s.borders.y1) / 2;
    
    for (let x = s.borders.x1; x < s.borders.x2; x += 10) {
        s.add.line(x, cy, x, cy - halfAreaHeight, x, cy + halfAreaHeight, 0x00ff00);
    }
    for (let y = s.borders.y1; y < s.borders.y2; y += 10) {
        s.add.line(cx, y, cx - halfAreaWidth, y, cx + halfAreaWidth, y, 0x00ff00);
    }

}

function updateEntities(s, entities) {

    const minX = s.borders.x1;
    const minY = s.borders.y1;
    const maxX = s.borders.x2;
    const maxY = s.borders.y2;
    entities.forEach((e) => {
        const outOfBounds = e.x < minX || e.x > maxX || e.y < minY || e.y > maxY;
        const changeDir = Math.random() < 0.01;
        if (changeDir) {
           e.dir = Math.random() * Math.PI * 2;
        }
        if (outOfBounds) {
           e.dir += Math.PI;
        }
        let newX = e.x + Math.cos(e.dir) * e.speed;
        let newY = e.y + Math.sin(e.dir) * e.speed;
        if (newX < minX) newX = minX;
        if (newX > maxX) newX = maxX;
        if (newY < minY) newY = minY;
        if (newY > maxY) newY = maxY;
        e.x = newX;
        e.y = newY;

        if (e.code === "enemy") {
            if (Math.abs(e.x - s.player.x) < 20 && Math.abs(e.y - s.player.y) < 20) {
                e.destroy();
            }
        }
     });
}

function addEntity(s, x, y, code) {

    const codeMap = {
        guest: "😆😱😀😅😎☺️😮😴😭😇",
        enemy: "😈😡🤬💩",
    }

    const eText = Array.from(codeMap[code])[Math.floor(Math.random() * codeMap[code].length)]

    const e = s.add.text(x, y, eText, {
        font: '48px Arial',
        fill: '#ffffff'
    }).setOrigin(0.5);
    e.code = code;

    e.dir = Math.random() * Math.PI * 2;
    e.speed = Math.random() * 1 + 0.5;

    return e;
}


function checkBorders(s, player) {

    if (player.x < s.borders.x1) {
        player.x = s.borders.x1;
    }
    if (player.x > s.borders.x2) {
        player.x = s.borders.x2;
    }
    if (player.y < s.borders.y1) {
        player.y = s.borders.y1;
    }
    if (player.y > s.borders.y2) {
        player.y = s.borders.y2;
    }

}

function setJoystickLikeInputs(s) {

    const p = s.player

    s.mouseDown = false;
        s.startX = 0;
        s.startY = 0;
        s.speed = 2;

    s.input.on('pointerdown', (pointer) => {
        s.mouseDown = true;
        s.startX = pointer.x;
        s.startY = pointer.y;
    });

    s.input.on('pointermove', (pointer) => {
        if (s.mouseDown) {
            let deltaX = pointer.x - s.startX;
            let deltaY = pointer.y - s.startY;
            
            let angle = Math.atan2(deltaY, deltaX);
            let sx = Math.cos(angle) * s.speed;
            let sy = Math.sin(angle) * s.speed;
            if (Math.abs(sx) > Math.abs(p.maxSpeed)) {
                sx = Math.sign(sx) * p.maxSpeed;
            }
            if (Math.abs(sy) > Math.abs(p.maxSpeed)) {
                sy = Math.sign(sy) * p.maxSpeed;
            }
            p.speedx = sx;
            p.speedy = sy;
        }
    });

    s.input.on('pointerup', () => {
        s.mouseDown = false;
        p.speedx = 0;
        p.speedy = 0;
    });
}