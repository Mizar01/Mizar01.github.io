function preloadFn() {
    // Load moon image
    this.load.image('moon', '/assets/img/moon.png');
}

function afterCreate(scene) {

    const { width, height } = scene.sys.game.canvas;
    // Add moon image attached to a container
    const moonContainer = scene.add.container(width / 2, height + 200);
    const img = scene.add.image(0, - height / 6 * 5, 'moon');
    moonContainer.add(img);
    //img.setScale(0.5);
    moonContainer.setDepth(-100);
    moonContainer.setAlpha(0.5);
    moonContainer.setAngle(-50);

    scene.time.addEvent({
        delay: 50,
        callback: () => {
           moonContainer.setAngle(moonContainer.angle + 0.05);
        },
        loop: true,
    });
    

    
}

snowFlakesWithAutoTimedText1(".",`
    Oh, fosse questa l'ultima volta, o Luna, che tu guardi sopra di me travagliato! 
    quante volte dinanzi a questo leggio io ho vegliato tardi nella notte aspettandoti: 
    e tu, mesta amica, sei pur sempre apparsa, a me su libri e su carte! 
    Oh, potessi in sulle cime dei monti aggirarmi per entro la tua amabile luce, 
    starmi sospeso cogli Spiriti in sui burroni, divagarmi, avvolto da' tuoi taciti albori, 
    sui prati, e, sgombro da tutte le vanità della scienza, 
    bagnarmi e rinfrancarmi nella tua rugiada.
    (J. W. Von Goethe)
`, {
    ratio: 100, 
    fill: "#ffffff",
    preloadFn: preloadFn,
    afterCreate: afterCreate,
});