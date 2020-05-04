class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.backround = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0,0);

        //menu display
        let menuConfig = {
            //fontFamily: 'Helvetica',
            fontSize: '28px',
            backgroundColor: '#21F1FF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        //adding menu text
        let textSpacer = 80;

        this.add.bitmapText(centerX, centerY - textSpacer, 'newFont', "Skip Class Master", 50).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY, 'newFont', "Press the (R) button to see the rules", 34).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer, 'newFont', "Use the (SPACEBAR) to begin the game", 34).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('ruleScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
}
