const defaultGameCfg = {
    areaWidth: 2000,
    areaHeight: 2000,
    playerIcon: "😍",
    playerMaxSpeed: 0.2,
    guests: 88,
    enemies: 4,
    sadGuests: 0,
    shits: 0,
    time: 60,
    title: "Save the Wedding",
    level: 1,
    description: `
        Scaccia gli ospiti indesiderati
    `,
};

let gameCfg = {};


function saveTheWedding(cfg = {}) {
    gameCfg = { ...defaultGameCfg, ...cfg };
    createPhaserGame(_create, _update);
}

function _create() {

    setBgColor("#000000");

    const { width, height } = this.sys.game.config;

    const areaWidth = gameCfg.areaWidth;
    const areaHeight = gameCfg.areaHeight;
    const borders = {
        x1: width / 2 - areaWidth / 2, y1: height / 2 - areaHeight / 2, 
        x2: width / 2 + areaWidth / 2, y2: height / 2 + areaHeight / 2
    };

    this.borders = borders;
    drawGrid(this);

    this.player = this.add.text(width / 2, height / 2, gameCfg.playerIcon, {
        font: '48px Arial',
        fill: '#ffffff'
    }).setOrigin(0.5);
    this.player.speedx = 0;
    this.player.speedy = 0;
    this.player.maxSpeed = gameCfg.playerMaxSpeed;
    
    setJoystickLikeInputs(this);

    // Set camera to follow player
    this.cameras.main.startFollow(this.player);

    this.entities = [];
    // Add random guests
    for (let i = 0; i < gameCfg.guests; i++) {
        addEntityInRandomPoint(this, "guest");
    }
    // Add random enemies
    for (let i = 0; i < gameCfg.enemies; i++) {
        addEntityInRandomPoint(this, "enemy");        
    }
    // Add random sadGuests
    for (let i = 0; i < gameCfg.sadGuests; i++) {
        addEntityInRandomPoint(this, "sadGuest");
    }
    // Add random shits
    for (let i = 0; i < gameCfg.shits; i++) {
        addEntityInRandomPoint(this, "shit");
    }

    // Debug on player position
    // this.time.addEvent({
    //     delay: 1000,
    //     callback: () => {
    //         console.log("Player position", this.player.x, this.player.y);
    //     },
    //     loop: true
    // });

    this.timeInSeconds = gameCfg.time;

    this.dashboard = createDashboard(this);


    const startText = createText(
        `Save    the    Wedding -    LIVELLO ${gameCfg.level}
         ${gameCfg.description}
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
            // timer.visible = true;
            // enemyCounter.visible = true;
            this.dashboard.visible = true;
            getScene().phase = "play";
        }
    })

    this.phase = "waitStart";

    this.time.addEvent({
        delay: 1000,
        callback: () => {
            if (getScene().phase === "play") {
                getScene().timeInSeconds--;
                updateDashboard();
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

function addEntityInRandomPoint(s, code) {
    const {rx, ry} = randomPoint(s.borders.x1, s.borders.y1, s.borders.x2, s.borders.y2);
    const e = addEntity(getScene(), rx, ry, code);
}

function randomPoint(x1, y1, x2, y2) {
    return {
        rx: Math.random() * (x2 - x1) + x1,
        ry: Math.random() * (y2 - y1) + y1
    };
}

function createDashboard(s) {

    const timer = createText("", {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        customProps: {percX:20, percY: 5},
    }).setOrigin(0.5);
    //timer.visible = false;
    timer.setScrollFactor(0);

    const targetCounter = createText("", {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        customProps: {percX:70, percY: 5},
    }).setOrigin(0.5);
    //targetCounter.visible = false;
    targetCounter.setScrollFactor(0);

    const dashboard = s.add.container(0, 0);
    dashboard.add([timer, targetCounter]);
    dashboard.visible = false;
    dashboard.timer = timer;
    dashboard.targetCounter = targetCounter;

    return dashboard;
}

function updateDashboard() {
    const s = getScene();
    s.dashboard.timer.setText("TIME: " + s.timeInSeconds);
    s.dashboard.targetCounter.setText(
        "😈: " + s.entities.filter((e) => e.code === "enemy").length + "  " + 
        "😢: " + s.entities.filter((e) => e.code === "sadGuest").length
    );
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
    const sadGuests = s.entities.filter((e) => e.code === "sadGuest");
    if (enemies.length + sadGuests.length === 0) {
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

        if (["guest", "enemy", "sadGuest"].includes(e.code)) {
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
                if (nearPlayer(e)) {
                    e.destroy();
                    e.isDestroyed = true;
                    createExplosion(s, e.x, e.y);
                    getScene().timeInSeconds += 10;
                }
            }

            if (e.code === "sadGuest") {
                if (nearPlayer(e)) {
                    e.text = "😀";
                    e.code = "guest";
                    getScene().timeInSeconds += 10;
                }
            }
        } else if (e.code === "shit") {
            if (nearPlayer(e, 40)) {
                e.timedEvents.forEach((evt) => evt.remove());
                e.destroy();
                e.isDestroyed = true;
                createExplosion(s, e.x, e.y);
                getScene().timeInSeconds -= 30;
            }
        }

     });
     s.entities = s.entities.filter((e) => !e.isDestroyed);

}

function nearPlayer(e, dist) {
    dist = dist || 20;
    const s = getScene();
    return Math.abs(e.x - s.player.x) < 20 && Math.abs(e.y - s.player.y) < dist
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
        enemy: "😈😡🤬",
        sadGuest: "😢😥😨😣😪😫😓😩",
        shit: "💩",
    }

    const arrayEmojis = Array.from(codeMap[code]);
    const eText = arrayEmojis[Math.floor(Math.random() * arrayEmojis.length)];

    let e = null;

    if (["guest", "sadGuest", "enemy"].includes(code)) {

        e = s.add.text(x, y, eText, {
            font: '48px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        e.dir = Math.random() * Math.PI * 2;
        e.speed = Math.random() * 1 + 0.5;

    } else if (code == "shit") {

        e = s.add.container(x, y);
        const c1 = s.add.container(0, 0);
        e.add(c1);
        const c2 = s.add.container(0, 0);
        c1.add(c2);
        const tIcon = s.add.text(0, 0, eText, {
            font: '48px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);
        e.add(tIcon);
        // e.dir = Math.random() * Math.PI * 2;
        // e.speed = Math.random() * 1 + 0.5;
        for (let i = 0; i < 4; i++) {
            const angle = Math.PI / 2 * i;
            const x = Math.cos(angle) * 40;
            const y = Math.sin(angle) * 40;
            const circle = s.add.circle(x, y, 4, 0xff0000);
            c2.add(circle);
        }
        const t = s.time.addEvent({
            delay: 30,
            callback: () => {
                c2.angle += 5;
            },
            loop: true,
        });
        e.timedEvents = [t];
    }

    e.code = code;
    s.entities.push(e);

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
            
            let angle = discreteAngle(Math.atan2(deltaY, deltaX));
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

function discreteAngle(angle, steps = 32) {
    const angleStep = (Math.PI) / (steps * 2);
    let da = Math.round(angle / angleStep) * angleStep;
    return da;
}