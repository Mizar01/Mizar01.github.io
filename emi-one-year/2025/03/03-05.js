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
    L’ultima luna
    La vide solo un bimbo appena nato
    Aveva occhi tondi e neri e fondi
    E non piangeva
    Con grandi ali prese la luna tra le mani
    E volò via e volò via
    Era l’uomo di domani 
    l’uomo di domani. 
    (L’ultima Luna – Lucio Dalla)
`, {
    ratio: 400, 
    fill: "#ffffff",
    preloadFn: preloadFn,
    afterCreate: afterCreate,
});