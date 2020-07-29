class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.score = 0;
    this.lives = 3;

    this.playerPos = {
      x: this.cameras.main.centerX,
      y: this.game.config.height - 30,
    };
  }

  create() {
    this.flipFlop = false;

    this.beams = this.physics.add.group();

    this.createPlayer();
    this.createBlocks();
    this.createBall();

    this.createColliders();

    this.createScore();
    this.createLives();
    this.createPauseButton();
  }

  update() {
    this.player.move();
    this.checkTouches();

    if (this.ball.y > this.game.config.height) {
      this.updateBall();
    }

    this.checkBeams();
  }

  createPlayer() {
    this.player = new Player(this, this.playerPos.x, this.playerPos.y);
  }

  createBall() {
    this.ball = new Ball(this, this.player.x, this.player.y - 100);
  }

  updateBall() {
    this.updateLives();

    this.player.setPosition(this.playerPos.x, this.playerPos.y);

    this.ball.setPosition(this.player.x, this.player.y - 200);
  }

  createBlocks() {
    this.blocks = this.physics.add.staticGroup();

    const cols = this.game.config.width / 100;
    const rows = 3;

    const x = 100;
    const y = 75;

    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        this.blocks.create(x * col, y * row, "block");
      }
    }
  }

  createColliders() {
    this.physics.add.collider(
      this.player,
      this.ball,
      this.hitPlatform,
      null,
      this
    );

    this.physics.add.collider(
      this.ball,
      this.blocks,
      this.hitBlock,
      null,
      this
    );

    this.physics.add.collider(this.beams, this.blocks, (beam, block) => {
      beam.destroy();
      this.changeBlockTexture(block);
    });
  }

  hitBlock(ball, block) {
    if (ball.body.velocity.x === 0) {
      let randNum = Math.random();

      if (randNum >= 0.5) {
        ball.body.setVelocityX(ball.velocity);
      } else {
        ball.body.setVelocityX(-ball.velocity);
      }
    }

    this.sound.play("hit_block", { volume: 0.25 });
    this.changeBlockTexture(block);

    if (this.blocks.getChildren().length === 0) {
      this.endGame("win");
    }
  }

  changeBlockTexture(block) {
    if (block.texture.key == "block_breaked") {
      block.destroy();
      this.updateScore();
    } else {
      block.setTexture("block_breaked");
    }
  }

  hitPlatform(player, ball) {
    ball.setVelocityY(ball.body.velocity.y - 10);

    let newVelocityX = Math.abs(ball.body.velocity.x) + 10;
    this.sound.play("hit_platform", { volume: 0.25 });

    if (ball.x < player.x) {
      ball.setVelocityX(-newVelocityX);
    } else {
      ball.setVelocityX(newVelocityX);
    }
  }

  createScore() {
    this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
      font: "32px Arial",
      fill: "black",
    });
  }

  updateScore() {
    this.score += 1;
    this.scoreText.text = `Score: ${this.score}`;
  }

  createLives() {
    this.livesText = this.add
      .text(this.game.config.width - 10, 10, `Lives: ${this.lives}`, {
        font: "32px Arial",
        fill: "black",
      })
      .setOrigin(1, 0);
  }

  updateLives() {
    this.lives -= 1;
    this.livesText.text = `Lives: ${this.lives}`;

    if (this.lives === 0) {
      this.endGame("lose");
    }
  }

  createPauseButton() {
    this.pause = this.add
      .image(this.game.config.width - 200, 20, "pause")
      .setOrigin(0, 0.35)
      .setScale(0.2)
      .setInteractive();

    this.pause.on("pointerdown", () => {
      this.scene.launch("Pause");
      this.scene.pause();
    });
  }

  checkBeams() {
    this.beams.children.iterate((beam) => {
      if (beam.y < -10) {
        beam.setActive(false);
        beam.body.enable = false;
      }
    });
  }

  checkTouches() {
    this.pointer = this.input.activePointer;

    if (this.pointer.isDown) {
      if (this.pointer.x > this.game.config.width / 2) {
        this.player.moveRight();
      } else {
        this.player.moveLeft();
      }
    }
  }

  endGame(state) {
    if (state === "win") {
      alert("You win");
    } else {
      alert("You lose(");
    }
    this.scene.restart();
  }
}
