createPhaserGame(_create, null, _preload);

function _preload() {
    this.load.audio('audio1', '2025/01-05.aac');
}

function _create() {

    setBgColor("#000000");
    createFloatingUpHearts();
    createPlayMusicButton("audio1", 50, 10);
    _textCenteredWhite1(`
        dklfdkf
        dfksdfl
        erewkrlwrk
        ewrkwl
    `);

}