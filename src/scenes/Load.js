class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        //loading font asset
        this.load.bitmapFont('newFont', './assets/fonts/pixel.png', './assets/fonts/pixel.fnt');

        //loading sound effect assets
        this.load.audio('sfx_jump', './assets/sounds/jump.wav');
        this.load.audio('sfx_pickup', './assets/sounds/pickup.wav');
        this.load.audio('sfx_explosion', './assets/sounds/explosion.wav');
        this.load.audio('sfx_closer', './assets/sounds/closer.wav')
        this.load.audio('bgm', './assets/sounds/bgm.wav');

        // load graphics assets
        this.load.image('background', './assets/graphics/Background.png');
        this.load.image('fragment', './assets/graphics/sparkFragment.png');
        this.load.spritesheet('runner', './assets/graphics/runner.png', {frameWidth: 107, frameHeight: 144});
        this.load.spritesheet('chaser', './assets/graphics/Chaser-sheet.png',{frameWidth: 401,frameHeight: 389});
        this.load.image('book', './assets/graphics/bookRevised.png');
        this.load.image('pencil', './assets/graphics/pencilRevised.png');
        this.load.image('balloon', './assets/graphics/balloonRevised.png');
        this.load.image('balloon2', './assets/graphics/balloon2Revised.png');
        this.load.image('PinkSlip', './assets/graphics/PinkSlip.png');

    }

    create() {
        // check for local storage browser support
        if (window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        //start in menu screeen
        this.scene.start("menuScene");
    }

}