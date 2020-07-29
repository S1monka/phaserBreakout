class PauseScene extends Phaser.Scene {
  constructor() {
    super("Pause");
  }

  create() {
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Press to resume",
        { font: "48px Arial", fill: "Black" }
      )
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.resume("Game");
      this.scene.stop();
    });
  }
}
