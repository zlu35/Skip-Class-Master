class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    create() {
        let gameOverConfig = {
            fontFamily: 'Courier',
            fontSize: '38px',
            color: '#000',
        }
        this.backround = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0,0);

        if (localStorage.getItem('highscore') != null) {
            let currHighScore = parseInt(localStorage.getItem('highscore'));

            if (score > currHighScore) {
                localStorage.setItem('highscore', score.toString());
                highScore = score;
                newHighScore = true;
            } else {
                highScore = parseInt(localStorage.getItem('highscore'));
                newHighScore = false;
            }
        } else {
            highScore = score;
            localStorage.setItem('highscore', highScore.toString());
            newHighScore = true;
        }

        let textSpacer = 85

        if (newHighScore) {
            this.add.text(centerX, centerY - (2 * textSpacer), 'New High-Score!', gameOverConfig).setOrigin(0.5);
        }
        this.add.text(centerX, centerY - textSpacer, `Your score for this round: ${score}`, gameOverConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, `The current high-score: ${highScore}`, gameOverConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Press (SPACEBAR) to play again', gameOverConfig).setOrigin(0.5);

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.backround.tilePositionX += 5
    
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('playScene');
        }
    }
}