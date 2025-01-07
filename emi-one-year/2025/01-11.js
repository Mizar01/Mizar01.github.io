const rTexts = [
    "Strufina",
    "Bumbolina",
    "Amore",
    "Divano",
    "CLD",
    "Casetta",
    "Zuppa",
    "Yoga",
    "Shivalingam",
    "Farinata",
    "Tampura",
    "Harmonium",
    "Canto",
    "Pachamama",
    "Tee Tree Oil",
    "Marmellatine",
    "Coccole",
    "Dentini",
    "Cacca",
    "Pizza",
    "Bali",
    "Costicine d'agnello",
    "Formaggio",
    "Incensi",
    "Pilates",
];

createPhaserGame(_create, _update);

function _create() {

    getScene().cameras.main.setBackgroundColor("#000000");

    const total = 90;
    texts = [];

    for (let i = 0; i < total; i++) {
        texts.push(buildTextObj());
    }

    getScene().texts = texts;
    console.log(getScene().texts);

}

function _update() {

    const texts = getScene().texts;

    for (let i = 0; i < texts.length; i++) {
        const t = texts[i];
        t.y = t.y - t.speed;
        if (t.y < 0) {
            randomizeAll(t);
        }
    }

}

function buildTextObj() {

    let t = createText("", 
    {
        color: '#ffffff',
    }).setOrigin(0.5);

    t.setBlendMode(Phaser.BlendModes.ADD);

    randomizeAll(t);

    return t;

}

function randomizeAll(t) {
    const size = Math.floor(Math.random() * 35) + 15;
    t.setFontSize(size);
    t.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
    t.text = rTexts[Math.floor(Math.random() * rTexts.length)];
    t.x = Math.random() * getScene().sys.game.canvas.width;
    t.y = getScene().sys.game.canvas.height + 100 + Math.random() * 260;
    t.speed = size / 25;
}