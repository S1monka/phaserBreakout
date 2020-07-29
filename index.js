const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  scene: [BootScene, PreloadScene, GameScene, PauseScene],
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  backgroundColor: "#fafad2",
};

const game = new Phaser.Game(config);

game.scale.lockOrientation("landscape-primary");
