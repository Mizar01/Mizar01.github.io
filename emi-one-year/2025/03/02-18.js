(async () => {
    try {
        await loadScriptAsync('libs/save_the_wedding.js');
        saveTheWedding({
            level: 2,
            time: 120,
            guests: 10,
            enemies: 8,
            sadGuests: 10,
            description: `
                1) Scaccia gli ospiti indesiderati
                2) Fai felici le persone tristi
            `,  
        });
    } catch (error) {
        console.error(error);
    }
    })();