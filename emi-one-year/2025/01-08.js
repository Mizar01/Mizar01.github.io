createPhaserGame(_create,);

function _create() {

    const { width, height } = getScene().sys.game.canvas;

    this.cameras.main.setBackgroundColor("#000000");

    const margin = 30;
    let score = 50;

    let scoreDownMs = 2000;
    let scoreDown = -1;
    let scoreToWin = 100;
    let scoreBadMole = -2;
    let scoreMole = 3;

    // wack a mole game
    const mole = this.add.text(width * 0.5, height * 0.5, "❤️", {font: "48px Arial"}).setOrigin(0.5);
    const badMole = this.add.text(width * 0.5, height * 0.5, "💔", {font: "48px Arial"}).setOrigin(0.5);

    createText("Raggiungi 100 punti beccando i cuori", {
        customProps: { percX: 50, percY: 10 },
        color: "#ffffff",
        font: "32px Arial",
        x: margin,
        y: margin,
    }).setOrigin(0.5);

    const scoreText = this.add.text(width * 0.5, height * 0.9, `${score}`, {font: "50px Arial"}).setOrigin(0.5);

    let timerScoreDown = this.time.addEvent({delay: scoreDownMs, callback: () => {
        score = Math.max(0, score + scoreDown);
        scoreText.setText(score);
        if (score === 0) {
            mole.timeToHide?.remove();
            badMole.timeToHide?.remove();
            timerScoreDown.remove();
            mole.destroy();
            badMole.destroy();
            createText("  Hai perso!  ", {
                customProps: {percX: 50, percY: 50}, 
                color: "#ffffff",
                font: "50px Arial"
            }).setOrigin(0.5);
            createFloatingUpText("💔");
        }
    }, loop: true});

    mole.setInteractive();
    badMole.setInteractive();

    const positions = [
        {x: width * 0.25, y: height * 0.15},
        {x: width * 0.50, y: height * 0.15},
        {x: width * 0.75, y: height * 0.15},

        {x: width * 0.25, y: height * 0.35},
        {x: width * 0.50, y: height * 0.35},
        {x: width * 0.75, y: height * 0.35},

        {x: width * 0.25, y: height * 0.55},
        {x: width * 0.50, y: height * 0.55},
        {x: width * 0.75, y: height * 0.55},

        {x: width * 0.25, y: height * 0.75},
        {x: width * 0.50, y: height * 0.75},
        {x: width * 0.75, y: height * 0.75},
    ];


    hideMole();
    hideBadMole();

    mole.on('pointerdown', () => {
        mole.timeToHide?.remove();
        score += scoreMole;
        scoreText.setText(score);
        if (score >= scoreToWin) {
            mole.timeToHide?.remove();
            badMole.timeToHide?.remove();
            timerScoreDown.remove();
            mole.destroy();
            badMole.destroy();
            createText("  Hai vinto!  ", {
                customProps: {percX: 50, percY: 50}, 
                color: "#ffffff",
                font: "50px Arial",
            }).setOrigin(0.5);
            createFloatingUpHearts();
        } else {
            hideMole();
        }
    });

    badMole.on('pointerdown', () => {
        badMole.timeToHide?.remove();
        score += scoreBadMole;
        scoreText.setText(score);
        hideBadMole();
    });

    function showMole() {
        ({x: mole.x, y: mole.y} = positions[Math.floor(Math.random() * positions.length)]);
        mole.visible = true;
        mole.timeToHide = getScene().time.addEvent({delay: randTime(), callback: () => { hideMole(); }});
    }

    function showBadMole() {
        ({x: badMole.x, y: badMole.y} = positions[Math.floor(Math.random() * positions.length)]);
        badMole.visible = true;
        badMole.timeToHide = getScene().time.addEvent({delay: randTime(400, 1000), callback: () => { hideBadMole(); }});
    }

    function hideMole() {
        mole.visible = false;
        getScene().time.addEvent({delay: randTime(400, 2000), callback: () => { showMole(); }});
    }

    function hideBadMole() {
        badMole.visible = false;
        let timeToShowMin = score < (scoreToWin / 2) ? 15000 : 15000 - (score - scoreToWin / 2) * 250;
        getScene().time.addEvent({delay: randTime(timeToShowMin), callback: () => { showBadMole(); }});
    }

    function randTime(base, max) {
        base = base || 1000;
        max = max || 3000;
        return base + Math.random() * (max - base);
    }

}

    