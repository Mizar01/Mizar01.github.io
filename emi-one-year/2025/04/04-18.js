(async () => {
    try {
        await loadScriptAsync('libs/save_the_wedding.js');
        saveTheWedding({
            level: 4,
            time: 120,
            guests: 10,
            enemies: 8,
            sadGuests: 10,
            shits: 10,
            movingShits: true,
            description: `
                1) Scaccia gli ospiti indesiderati
                2) Fai felici le persone tristi
                3) Non pestare le cacche
                4) Le cacche si muovono
            `,  
        });
    } catch (error) {
        console.error(error);
    }
    })();