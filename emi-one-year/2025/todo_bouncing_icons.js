createPhaserGame(_create,);

function _create() {

    const props =     {
        color: '#ffffff',
        customProps: {
            percX: 35, 
            percY: 50,
        },
        fontSize: '64px',
    };

    const tmic = createText(`👨🏼‍🦰`, props);
    const theart = createText(`❤️`, props);
    theart.x += 64;
    const temi = createText(`👩🏼‍🦰`, props);
    temi.x += 128;

    let micAngle = Math.random() * Math.PI * 2;
    let heartAngle = Math.random() * Math.PI * 2;
    let miAngle = Math.random() * Math.PI * 2;

    const speed = 1.5;

    
    
    this.cameras.main.setBackgroundColor("#000000");

    const { width, height } = getBodySize();

    const evt = this.time.addEvent({
        delay: 50,
        callback: () => {
            tmic.x = tmic.x + Math.cos(micAngle) * speed;
            tmic.y = tmic.y + Math.sin(micAngle) * speed;
            theart.x = theart.x + Math.cos(heartAngle) * speed;
            theart.y = theart.y + Math.sin(heartAngle) * speed;
            temi.x = temi.x + Math.cos(miAngle) * speed;
            temi.y = temi.y + Math.sin(miAngle) * speed;

            // Never stop
            if (tmic > width || tmic.y > height) {
                // bounce reverting the angle
                micAngle = Math.PI - micAngle;
            }
            if (theart > width || theart.y > height) {
                heartAngle = Math.PI - heartAngle;
            }
            if (temi > width || temi.y > height) {
                miAngle = Math.PI - miAngle;
            }
            if (tmic < 0 || tmic.y < 0) {
                micAngle = Math.PI - micAngle;
            }
            if (theart < 0 || theart.y < 0) {
                heartAngle = Math.PI - heartAngle;
            }
            if (temi < 0 || temi.y < 0) {
                miAngle = Math.PI - miAngle;
            }
        },
        loop: true,
    });


    createFloatingUpHearts();

}