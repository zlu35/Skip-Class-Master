class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        score = 0;
        
         //placed the tile sprite: set up the background
         this.backround = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0,0);
         // reset parameters
         this.barrierSpeed = -200;
         this.barrierSpeedMax = -1000;
         this.itemSpeed = -350
         this.itemSpeedMax = -1500;
         jumpV = -800;          // set jump velocity
         
         //bgm
         this.bgmusic=this.sound.add('bgm',{
             mute:false,
             volumn:1,
             rate:1,
             loop:true
         });
         this.bgmusic.play();
         // difficulty level
         level = 0;
 
         // set up cursor keys
         cursors = this.input.keyboard.createCursorKeys();
 
         // set up gravity
         this.physics.world.gravity.y = 2600;
 
         // create the runner & chaser
         runner = this.physics.add.sprite(450, game.config.height, 'runner').setScale(1).setOrigin(0.5);
         chaser = this.physics.add.sprite(0, game.config.height, 'chaser').setScale(0.7).setOrigin(0.5);
         // set the bound & not allow collide away
         runner.setCollideWorldBounds(true);
         runner.setImmovable();
         chaser.setCollideWorldBounds(true);
         chaser.setImmovable();
         runner.dead = false;
        this.anims.create({
            key:'chase',
            frames: this.anims.generateFrameNumbers('chaser',{start:0,end:3}),
            framerate: 2,
            repeat: -1
        });
        this.anims.create({
            key:'run',
            frames: this.anims.generateFrameNumbers('runner', { start: 0, end: 11}),
               frameRate: 2,
               repeat: -1
        });

         this.barrierGroup = this.add.group({
             runChildUpdate: true    // make sure update runs on group children
         });
         this.itemGroup = this.add.group({
             runChildUpdate: true
         })
         this.addBarrier();
 
         this.difficultyTimer = this.time.addEvent({
             delay: 1000,
             callback: this.levelBump,
             callbackScope: this,
             loop: true
         });
        
         let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.currentScore = this.add.text(775, 54, score, scoreConfig);
         // set up difficulty timer (triggers callback every second)
         
     }
 
     addBarrier() {
         // randomly generalize barrier types
         mark = Phaser.Math.Between(0,8);
         if(mark == 0) {
             barrier = new Book(this, this.barrierSpeed).setScale(1);
             this.barrierGroup.add(barrier);                         // add it to existing group

         }
         if(mark == 1) {
             barrier = new Balloon(this, this.barrierSpeed).setScale(1);
             this.barrierGroup.add(barrier);                         // add it to existing group

         }
         if(mark == 2) {
             barrier = new Balloon2(this, this.barrierSpeed).setScale(1);
             this.barrierGroup.add(barrier);                         // add it to existing group

         }
         if(mark == 3) {
             barrier = new Pencil(this, this.barrierSpeed).setScale(1);
             this.barrierGroup.add(barrier);                         // add it to existing group

         }
         if (mark == 4) {
             item = new PinkSlip(this, this.itemSpeed).setScale(1);
             this.itemGroup.add(item);
         }
         if(mark == 5) {
            barrier = new Book(this, this.barrierSpeed).setScale(1);
            this.barrierGroup.add(barrier);                         // add it to existing group

        }
        if(mark == 6) {
            barrier = new Balloon(this, this.barrierSpeed).setScale(1);
            this.barrierGroup.add(barrier);                         // add it to existing group

        }
        if(mark == 7) {
            barrier = new Balloon2(this, this.barrierSpeed).setScale(1);
            this.barrierGroup.add(barrier);                         // add it to existing group

        }
        if(mark == 8) {
            barrier = new Pencil(this, this.barrierSpeed).setScale(1);
            this.barrierGroup.add(barrier);                         // add it to existing group

        }
     }
     update() {
         // set up scrolling background
         this.backround.tilePositionX += 5;
         chaser.anims.play('chase',true);
         if(!runner.dead) {
             runner.anims.play('run',true);

             // check for player input: space for jump
             if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
                 runner.body.setVelocityY(jumpV);
                 chaser.body.setVelocityY(jumpV); // imitate chasing
                // runner.anims.play('space', true);
                 this.sound.play('sfx_jump')
             } else if(cursors.down.isDown) {
                 runner.body.y = game.config.height - 100;

            }

             // check for collisions between runner and barriers
             this.physics.world.collide(runner, this.barrierGroup, this.chaserCloser, null, this);
             
             // once the chaser catches, runner dies
             this.physics.world.collide(runner, chaser, this.runnerCollision, null, this);
             
             //this.physics.world.collide(runner, this.barrierGroup, this.runnerCollision, null, this);
             this.physics.world.collide(runner, this.itemGroup, this.scoreIncrease, null, this);
         }
         
         
     }
 
     levelBump() {
         score++;
         // increment level (aka score)
         level++;
 
         // bump speed every 5 levels
         if(level % 5 == 0) {
             if(this.barrierSpeed >= this.barrierSpeedMax) {     // increase barrier speed
                 this.barrierSpeed -= 25;
             }

             if (this.itemSpeed >= this.itemSpeedMax) {
                 this.itemSpeed -= 30;
             }
         }
         this.currentScore.setText(score); 
    }

    chaserCloser(){
        this.sound.play('sfx_closer');
        chaser.body.x += 10; //chaser get closer
    }

    barrierDestroy(){
        this.barrierGroup.destroy;
    }

    itemDestroy() {
        this.itemGroup.destroy;
    }

    scoreIncrease() {
        console.log(this.item);
        score += 10;
        this.currentScore.setText(score);
        this.sound.play('sfx_pickup')
    }
    
    runnerCollision() {
        runner.dead = true;                    // turn off collision checking
        this.difficultyTimer.destroy();        // shut down timer
        this.bgmusic.destroy();
        // create particle explosion
        let deathParticles = this.add.particles('fragment');
        let deathEmitter = deathParticles.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 0.75, end: 0 },
            speedX: { min: -50, max: 500 },
            speedY: { min: -500, max: 500 },
            lifespan: 500
        });
        // make runner boom 💥
        deathEmitter.explode(150, runner.x, runner.y);
        // kill runner
        runner.destroy();              
        // switch states after timer expires
        console.log("GameOver");        
        this.sound.play('sfx_explosion');
        this.time.delayedCall(3000, () => { this.scene.start('gameOverScene'); });

    }
}