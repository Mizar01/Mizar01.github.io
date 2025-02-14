(async () => {
try {
    await loadScriptAsync('libs/save_the_wedding.js');
    saveTheWedding();
} catch (error) {
    console.error(error);
}
})();
  