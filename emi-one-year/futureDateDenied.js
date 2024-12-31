// displayInspiration({
//     text: `
//         Il futuro è incerto. Non avventurarti in esso.
//     `,
//     effect: 'typewriter',
//     bgEffectCommand: `fire({
//         percX: 50,
//         percY: 85,
//         initialScale: 15,
//     });`,
// });

createPhaserGame(_create);

function _create() {
    const testo = `
        [Accesso negato]
        Il futuro è incerto. 
        Il futuro è imperscrutabile.
    `;
    createText(`
        ${testo}
    `, 
    {
        color: '#ffffff',
        customProps:{
            percX: 15, 
            percY: 25,
            effect: 'typewriter',
            effectProps: {
                delay: 50,
            },
        },
    });
    getScene().cameras.main.setBackgroundColor("#000000");
    createFireEffect({
        percX: 50,
        percY: 85,
        initialScale: 16,
    });
}
