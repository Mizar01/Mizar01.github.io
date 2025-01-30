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

    console.log(borders);

    this.borders = borders;
    drawGrid(this);

    this.player = this.add.text(width / 2, height / 2, "😍", {
        font: '48px Arial',
        fill: '#ffffff'
    }).setOrigin(0.5);
    this.player.speedx = 0;
    this.player.speedy = 0;
    this.player.maxSpeed = 0.2;
    
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
    for (let i = 0; i < 4; i++) {
        let e = addEntity(this, Math.random() * areaWidth + borders.x1, Math.random() * areaHeight + borders.y1, "enemy");
        this.entities.push(e);
    }

    // Debug on player position
    // this.time.addEvent({
    //     delay: 1000,
    //     callback: () => {
    //         console.log("Player position", this.player.x, this.player.y);
    //     },
    //     loop: true
    // });

    this.timeInSeconds = 60;

    const timer = createText("", {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        customProps: {percX:20, percY: 5},
    }).setOrigin(0.5);
    timer.visible = false;
    timer.setScrollFactor(0);

    const enemyCounter = createText("", {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        customProps: {percX:70, percY: 5},
    }).setOrigin(0.5);
    enemyCounter.visible = false;
    enemyCounter.setScrollFactor(0);


    const startText = createText(
        `Save    the    Wedding -    LIVELLO 1
         Scaccia gli ospiti indesiderati!
        `, {
        font: '48px Arial',
        color: '#ffffff',
        backgroundColor: '#000000',
        customProps: { percX: 50, percY: 30, },
    }).setOrigin(0.5);

    const startButton = createTextButton(`Start`, {
        x: width / 2, y: height / 2 + 100,
        fontSize: '24px',
        onClick: () => {
            startText.destroy();
            startButton.destroy();
            timer.visible = true;
            enemyCounter.visible = true;
            getScene().phase = "play";
        }
    })

    this.phase = "waitStart";

    this.time.addEvent({
        delay: 1000,
        callback: () => {
            if (getScene().phase === "play") {
                getScene().timeInSeconds--;
                timer.setText("TIME: " + getScene().timeInSeconds);
                enemyCounter.setText(
                    "Indesiderati: " + getScene().entities.filter((e) => e.code === "enemy").length);
            }
            if (getScene().timeInSeconds <= 0) {
                getScene().phase = "gameover";
                createText(
                    `Hai perso. Il tuo matrimonio è rovinato`, {
                    font: '48px Arial',
                    color: '#ffffff',
                    backgroundColor: '#000000',
                    customProps: { percX: 50, percY: 30, },
                }).setOrigin(0.5).setScrollFactor(0);
                createTextButton(`Riprova`, {
                    x: width / 2, y: height / 2 + 100,
                    fontSize: '24px',
                    onClick: () => {
                       window.location.reload();
                    }
                }).setOrigin(0.5).setScrollFactor(0);
            }
        },
        loop: true
    });


}

function _update() {

    if (this.phase == "play") {

        this.player.x += this.player.speedx * this.game.loop.delta;
        this.player.y += this.player.speedy * this.game.loop.delta;
        checkBorders(this, this.player);
        updateEntities(this, this.entities);
        checkAndShowVictory(this);

    }


}

function checkAndShowVictory(s) {
    
    const enemies = s.entities.filter((e) => e.code === "enemy");
    if (enemies.length === 0) {
        s.phase = "victory";
        const startText = createText(
            `Hai Vinto. Il tuo matrimonio è salvo`, {
            font: '48px Arial',
            color: '#ffffff',
            backgroundColor: '#000000',
            customProps: { percX: 50, percY: 30, },
        }).setOrigin(0.5);
        startText.setScrollFactor(0);
    }

}

// TODO: improve
function drawGrid(s) {

    const halfAreaWidth = (s.borders.x2 - s.borders.x1) / 2;
    const halfAreaHeight = (s.borders.y2 - s.borders.y1) / 2;   

    const cx = s.borders.x1 + halfAreaWidth;
    const cy = s.borders.y1 + halfAreaHeight;

    const divisions = 10;
    const stepX = halfAreaWidth * 2 / divisions;
    const stepY = halfAreaHeight * 2 / divisions;
    
    for (let x = s.borders.x1; x <= s.borders.x2; x += stepX) {
        s.add.line(0, 0, x, s.borders.y1, x, s.borders.y2, 0x00ff00).setOrigin(0, 0);
    }
    for (let y = s.borders.y1; y <= s.borders.y2; y += stepY) {
        s.add.line(0, 0, s.borders.x1, y, s.borders.x2, y, 0x00ff00).setOrigin(0, 0);
    }

}

function updateEntities(s) {

    const minX = s.borders.x1;
    const minY = s.borders.y1;
    const maxX = s.borders.x2;
    const maxY = s.borders.y2;
    s.entities.forEach((e) => {
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
                e.isDestroyed = true;
                createExplosion(s, e.x, e.y);
                getScene().timeInSeconds += 10;
            }
        }
     });
     s.entities = s.entities.filter((e) => !e.isDestroyed);

}

function createExplosion(s, x, y) {
    const explosion = s.add.text(x, y, "💥", {
        font: '24px Arial',
        fill: '#ffffff'
    }).setOrigin(0.5);
    explosion.life = 10;
    explosion.maxLife = 10;
    const t = s.time.addEvent({
        delay: 30,
        callback: () => {
            explosion.setScale(explosion.maxLife / explosion.life);
            explosion.life -= 1;
            if (explosion.life <= 0) {
                explosion.destroy();
                t.remove(); 
            }
        },
        loop: true,
    });
}

function addEntity(s, x, y, code) {

    const codeMap = {
        guest: "😆😱😀😅😎☺️😮😴😭😇",
        enemy: "😈😡🤬💩",
    }

    const arrayEmojis = Array.from(codeMap[code]);
    const eText = arrayEmojis[Math.floor(Math.random() * arrayEmojis.length)];

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