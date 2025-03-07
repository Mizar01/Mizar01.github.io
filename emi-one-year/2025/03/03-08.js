createPhaserGame(_create, null, _preload);

function _preload() {
    this.load.image('mimosa', '/assets/img/mimosa.png');
}

function _create() {

    setBgColor("#000000");

    createFloatingUpRandomText(["⭐", "💖", "💙", "💛"]);

    const {width, height} = getBodySize();
    const mcont = this.add.container(width / 2, height + 200);
    const img = this.add.image(0, - height / 6 * 5, 'mimosa');
    mcont.add(img);
    //img.setScale(0.5);
    mcont.setDepth(10);
    // mcont.setAlpha(0.5);
    // mcont.setAngle(-50);
    mcont.setScale(0.7);

    this.time.addEvent({
        delay: 50,
        callback: () => {
            // move slightly with sin on current time value 
            mcont.y = height + 200 - Math.sin(this.time.now / 1000) * 10;
            mcont.angle = Math.sin(this.time.now / 10000) * 5;
            mcont.setScale(0.7 + Math.sin(this.time.now / 10000) * 0.01);
        },
        loop: true,
    });

    createText(`
        Buona festa della donna
        😘 😘 😘
    `, 
    {
        customProps:{
            percX: 50, 
            percY: 20,
            effect: 'typewriter',
            effectProps: {
                delay: 150,
            },
        },
        color: '#ffffff',
        fontSize: "24px",
    }).setOrigin(0.5).setDepth(20);



}