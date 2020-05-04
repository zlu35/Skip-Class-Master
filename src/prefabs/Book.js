class Book extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, velocity){
        super(scene, game.config.width, game.config.height, 'book');
        // set up physics sprite
        scene.add.existing(this); // add to existing list
        scene.physics.add.existing(this); // add physic body
        this.setVelocityX(velocity); // velocity is negative => move left
        this.setImmovable();
        this.scene = scene;
        this.velocity = velocity;
        this.newBarrier = true;
        // set barrier not affected by gravity 
        this.body.setAllowGravity(false); 
    }

    update() {
        // override physics sprite update()
        super.update();

        // add new barrier when existing barrier hits center X
        if(this.newBarrier && this.x < centerX) {
            this.newBarrier = false;
            // call parent scene method from this context
            this.scene.addBarrier(this.parent, this.velocity);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}