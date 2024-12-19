function fire() {

    createPhaserGame(create, update);

    // Create a fire emitter with only geometry shapes (no loading of images)

    function create() {

        // Create a graphics object to generate a circle-shaped particle texture
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(5, 5, 5); // Center (5, 5), Radius: 5
        graphics.generateTexture('fireParticle', 10, 10); // Texture size: 10x10
        graphics.destroy(); // Clean up the graphics object
    
        // Add particles using the generated texture
        const particles = this.add.particles(this.game.config.width / 2, this.game.config.height / 2, 'fireParticle', {
            speed: { min: 50, max: 100 },
            angle: { min: -75, max: -105 },
            scale: { start: 4, end: 0 },
            alpha: { start: 0.4, end: 0.1 },
            lifespan: 1800,
            blendMode: 'ADD',
            frequency: 30,
            tint: [0xff4500, 0xffa500, 0xffff00] // Fire colors
        });

    }

    function update() {
        // No need to update anything
    }



}