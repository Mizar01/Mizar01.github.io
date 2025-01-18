createPhaserGame(_create);

function _create() {

    setBgColor("#000000");
    
    displayInspiration({
        text: `
        La mia All Black sei tu oggi!
        
        <a href="https://www.youtube.com/watch?v=0ikmASNtjuk">Pigia qui</a>
        `,
    });

    // change font color of #inspiration-body 
    document.getElementById('main-container').style.zIndex = '1000';

}