class Rules extends Phaser.Scene {
    constructor() {
        super("ruleScene");
    }

    create() {
        this.backround = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0,0);

        //menu display
        let ruleConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#21F1FF',
            color: '#000000',
            align: 'right',
            
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        let xPosition = 15;
        let yPosition = 20;
        let textSpacer = 80

        this.add.bitmapText(xPosition, yPosition, 'newFont', '• Run away from the professor trying to catch you!', 30).setOrigin(0, 0);
        this.add.bitmapText(xPosition, yPosition + textSpacer, 'newFont', '• Use the (SPACEBAR) to continuously rocket jump over\n obstacles.', 28).setOrigin(0, 0);
        this.add.bitmapText(xPosition, yPosition + (2 * textSpacer), 'newFont', '• For every obstacle you hit, the professor gets closer.', 28).setOrigin(0, 0);
        this.add.bitmapText(xPosition, yPosition + (3 * textSpacer), 'newFont', '• Do not stay trapped in the obstacles, the professor\n will make a strong push.', 30).setOrigin(0, 0);
        this.add.bitmapText(xPosition, yPosition + (4 * textSpacer), 'newFont', '• Hitting obstacles on the lower part of the screen\n will make the professor move faster.', 30).setOrigin(0, 0);
        this.add.bitmapText(xPosition, yPosition + (5 * textSpacer), 'newFont', "• Aim for the sick-day pink slips to get more points.", 30).setOrigin(0, 0);
        this.add.bitmapText(xPosition, yPosition + (6 * textSpacer), 'newFont', "• Use the (DOWN) to dodge down when on the ground.", 30).setOrigin(0, 0);
        ruleConfig.backgroundColor = "#E3FF25";
        this.add.bitmapText(centerX, yPosition + (7 * textSpacer), 'newFont', 'Press (R) to return to main menu', 30).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('menuScene');
        }
    }
}