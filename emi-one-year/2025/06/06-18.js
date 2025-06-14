(async () => {
    try {
        await loadScriptAsync('libs/save_the_wedding.js');
        saveTheWedding({
            level: 6,
            time: 120,
            guests: 10,
            enemies: 8,
            sadGuests: 10,
            shits: 25,
            sweets: 10,
            sadGuestResolveMode: "bySweet",
            movingShits: true,
            description: `
                1) Scaccia gli ospiti indesiderati
                2) Fai felici le persone tristi con i dolcetti che trovi in giro
                3) Non pestare le cacche mobili
            `,
        });
    } catch (error) {
        console.error(error);
    }
    })();