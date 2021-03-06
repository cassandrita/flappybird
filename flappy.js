// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(700, 400, Phaser.AUTO, 'game', stateActions);
var score= 0;
var player;



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
    game.stage.setBackgroundColor("#FF9CDE");
    game.add.text(90, 200, "Welcome to flappy bird!", {font: "20px Arial", fill: "0000FF"});
    game.add.audio("score");
    var x = 100;
    var y = 200;
    player = game.add.sprite(x, y, "playerImg1");

    game.input.onDown.add(clickHandler)
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(leftHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(rightHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(upHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(downHandler);

    var pipePosition = 0;
    for (var pipeN = 0; pipeN < 7; pipeN++) {
        var gapStart = Math.floor(Math.random() * 5)+1;
        var gapSize = Math.floor(Math.random() * 3)+1;
        var blockDist=Math.floor(Math.random()*100)+80;
        pipePosition = pipePosition + blockDist;

        //floor>integer
        for (var count = 0; count < gapStart; count++) {
            // count++ must start from count=0, y coordinate changes
            //game.add.text(20,20*count,"clap");
            game.add.sprite(pipePosition, 50 * (count), "playerImg6")
        }
        for (var count = gapStart + gapSize; count < 8; count++) {
            game.add.sprite(pipePosition, 50 * (count), "playerImg6");
        }
    }
}

    function clickHandler(event){
        //alert(event.x+":"+event.y)
        game.add.sprite(event.x,event.y, "playerImg5")
        game.sound.play("score")
        //alert(score);

    }

function spaceHandler(){
    //alert("spacebar");
    //game.sound.play("score");
    //game.add.sprite(Math.random()*350,Math.random()*350, "playerImg5");
    //score=score+3;
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
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}

