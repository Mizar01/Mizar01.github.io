
createPhaserGame(_create, _update);

function _create() {

   setBgColor("#000000");

   const emotionsEmojis = "😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🤩🥳😏😒😞😔😟😕🙁☹😣😖😫😩😢😭😤😠😡🤬🤯😳🥺😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩"
   const animalEmojis = "👻💀☠👽👾🤖🎃😺😸😹😻😼😽🙀😿😾🙈🙉🙊🐵🐒🦍🦧🐶🐕🦮🐕‍🦺🐩🐺🦊🦝🐱🐈🐈‍⬛🦁🐯🐅🐆🐴🐎🦄🦓🦌🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🦙🦒🐘🦏🦛🦘🦡🐭🐁🐀🐹🐰🐇🐿🦔🦇🐻🐨🐼🦥🦦🦨🦩🦮🐾🦜🐔🐓🐣🐤🐥🐦🐧🕊🦅🦆🦢🦉🦤";

   // Show a grid where 40 emojis are displayed together.
   // They move slowly in different and free square of the greed.

   const gridX = 10;
   const gridY = 20;

   const { width, height } = getScene().sys.game.canvas;

   this.emojiGroup = []

   this.boxing = 15;
   this.emojiSize = 340;

   // TODO: la grid non serve a niente. Basta crearne un tot
   const arrayEmojis = Array.from(emotionsEmojis);
   for(let i = 0; i < this.emojiSize; i++) {
      const randomEmoji = arrayEmojis[Math.floor(Math.random() * arrayEmojis.length)];
      const emoji = this.add.text(
         Math.random() * (width - this.boxing) + this.boxing, Math.random() * (height - this.boxing) + this.boxing,
         randomEmoji,
         {font: "36px Arial"}).setOrigin(0.5);
      emoji.dir = Math.random() * Math.PI * 2;
      this.emojiGroup.push(emoji);
   }

   _textCenteredWhite1("Chiamale se vuoi... emozioni");

}

function _update() {
   const { width, height } = this.sys.game.canvas;
   const boxing = this.boxing;
   const minX = boxing, minY = boxing, maxX = width - boxing, maxY = height - boxing;
   this.emojiGroup.forEach((emoji) => {
      const outOfBounds = (emoji) => emoji.x < minX || emoji.x > maxX || emoji.y < minY || emoji.y > maxY;
      const changeDir = Math.random() < 0.01;
      if (changeDir) {
         emoji.dir = Math.random() * Math.PI * 2;
      }
      if (outOfBounds(emoji)) {
         emoji.dir += Math.PI;
      }
      const speed = 1;
      let newX = emoji.x + Math.cos(emoji.dir) * speed;
      let newY = emoji.y + Math.sin(emoji.dir) * speed;
      if (newX < minX) newX = minX;
      if (newX > maxX) newX = maxX;
      if (newY < minY) newY = minY;
      if (newY > maxY) newY = maxY;
      emoji.x = newX;
      emoji.y = newY;
   });
}