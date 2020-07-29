class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ball");

    this.velocity = 300;

    this.init();
  }

  init() {
    this.scene.add.existing(this);

    this.scene.physics.world.enable(this);

    this.setCollideWorldBounds(true);
    this.setBounce(1);

    this.scene.physics.world.checkCollision.down = false;

    this.setVelocityY(this.velocity);
  }
}
