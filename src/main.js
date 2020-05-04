//collarators: Hang Rui, Zhifeng Lu, Amir Alaj
//Game title: Skip Class Master
//Date Complete: May 3rd,2020
//Creative Tilt: 
//technocally interesting that randomly create different types of barriers during playing, and there is a chaser
//chasing the player, which lead to some excitement. 
//Art and background Music are create by ourselves. Interesting and creative.
//The mechanics that the chaser will get closer to the player everytime the player collide with barrier until
//the chaser touchs the player is actually giving the player more chances to have failed dodges.
//Instead of losing once player collide with barrier, our game set the losing condition as once the chaser
//catches the player.  
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Menu, Rules, Play, GameOver ]
};

//define game
let game = new Phaser.Game(config);

// define globals
let keySPACE, keyR;
let runner = null;
let chaser = null;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
//const gravity = 150;
const tileSize = 35;
const SCALE = 0.5;
let level;
let mark; //to control generalization of barrier
let score;
let highScore;
let newHighScore = false;
let cursors;
let jumpV;
let barrier;
let item;