// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(700, 400, Phaser.AUTO, 'game', stateActions);
var score= 0;
var player;
var pipes;


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg1", "assets/flappy_superman.png");
    game.load.image("playerImg2", "assets/flappy_batman.png");
    game.load.image("playerImg3", "assets/ironman.png")
    game.load.image("playerImg4", "assets/hulk.png")
    game.load.image("playerImg5", "assets/flappy.png")
    game.load.audio("score", "assets/point.ogg")
    game.load.image("playerImg6","assets/pipe.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE)


    game.stage.setBackgroundColor("#FF9CDE");
    game.add.text(90, 200, "Welcome to flappy bird!", {font: "20px Arial", fill: "0000FF"});
    game.add.audio("score");

    game.input.onDown.add(clickHandler)
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(leftHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(rightHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(upHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(downHandler);

    pipes=game.add.group();
    //generate_pipes();
    game.time.events.loop(1.5*Phaser.Timer.SECOND,generate_pipes)

    var x = 100;
    var y = 200;
    //set initial coordinates for player
    player = game.add.sprite(x, y, "playerImg1");
    game.physics.arcade.enable(player);
    //centre player image
    //player.anchor.setTo(0.5,0.5);
    //make sure player within the screen
    //player.checkWorldBounds=true;
    player.body.velocity.y=-100;
    player.body.velocity.x=0;
    player.body.gravity.y=150;
}

function generate_pipes() {
    var pipe_offset = 700;

    var gapStart = Math.floor(Math.random() * 5) + 1;
    var gapSize =  3;

    //floor>integer
    for (var count = 0; count < gapStart; count++) {
        // count++ must start from count=0, y coordinate changes
        //game.add.text(20,20*count,"clap");
        add_pipe_part(pipe_offset, 50 * (count), "playerImg6")
    }
    for (var count = gapStart + gapSize; count < 8; count++) {
        add_pipe_part(pipe_offset, 50 * (count), "playerImg6");
    }

}



    function clickHandler(event){
        //alert(event.x+":"+event.y)
        //game.add.sprite(event.x,event.y, "playerImg5")
       // game.sound.play("score")
        //alert(score);

    }

function spaceHandler(){
    //alert("spacebar");
    //game.sound.play("score");
    //game.add.sprite(Math.random()*350,Math.random()*350, "playerImg5");
    //score=score+3;
    player_jump();
}

function player_jump(){
    player.body.velocity.y=-100;
}
function leftHandler(){
    moveLeft();
}
function rightHandler(){
    moveRight();
}
function downHandler(){
    moveDown();
}
function upHandler(){
    moveUp();
}

function moveLeft(){
    player.x=player.x-10
}
function moveRight(){
    player.x=player.x+10
}
function moveUp(){
    player.y=player.y-10
}
function moveDown(){
    player.y=player.y+10
}

function add_pipe_part(x,y, pipe_part){
    var pipe=pipes.create(x,y,pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x=-200;
}
function game_over(){
    //alert("GAME OVER!");
    //location.reload();
    player.body.velocity.y = 0;
    game.physics.disable(pipes, Phaser.Physics.ARCADE);
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
game.physics.arcade.overlap(player,pipes,game_over);
}

