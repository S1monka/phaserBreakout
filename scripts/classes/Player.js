class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "platform");

    this.init();
  }

  init() {
    this.scene.add.existing(this);

    this.scene.physics.world.enable(this);

    this.setImmovable(true);

    this.setCollideWorldBounds(true);
  }

  createBeam() {
    if (!this.scene.flipFlop) {
      this.scene.beams.create(this.x, this.y - this.height, "beam");
      this.scene.flipFlop = true;

      this.scene.beams.setVelocityY(-300);
    }
  }

  moveRight() {
    this.x += 10;
  }

  moveLeft() {
    this.x -= 10;
  }

  move() {
    if (this.scene.cursors.left.isDown) {
      this.moveLeft();
    } else if (this.scene.cursors.right.isDown) {
      this.moveRight();
    }

    if (this.scene.cursors.up.isDown) {
      this.createBeam();
    } else if (this.scene.cursors.up.isUp) {
      this.scene.flipFlop = false;
    }
  }
}
