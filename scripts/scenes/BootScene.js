class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }
  create() {
    this.scene.start("Preload");
  }
}
