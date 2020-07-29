class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }
  preload() {
    this.load.image("platform", "assets/platform.png");
    this.load.image("ball", "assets/ball.png");
    this.load.image("block", "assets/block.png");
    this.load.image("block_breaked", "assets/block_breaked.png");
    this.load.image("beam", "assets/beam.png");
    this.load.image("pause", "assets/circled-pause.png");

    this.load.audio("hit_platform", "assets/laser1.ogg");
    this.load.audio("hit_block", "assets/tone1.ogg");
  }
  create() {
    this.scene.start("Game");
  }
}
