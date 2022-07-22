// globals
let gameStatus = 0;
let y = -20;
let x = 200;
let speed = 2;
let score = 0;
let lives = 5;
let ballR = 151;
let ballG = 240;
let ballB = 237;

// sets up start screen, prompts player to click to begin
function setup() {
    createCanvas(800, 600);
    background(178, 121, 219);
    textSize(32);
    fill(212, 166, 245);
    textAlign(CENTER);
    text('collect the blue orbs,\navoid the orange orbs!\nclick to begin!', 400, 300);
    reset();
 }

// game status represents the status of the game: start screen, the actual game, and the end screen 
function draw() {
	if (gameStatus == 1) gameOn();
    else if (gameStatus == 2) gameOff();
}

// when mouse is clicked in between game statuses, the status changes
function mouseClicked() {
    if (gameStatus == 0) gameStatus = 1;
    else if (gameStatus == 2) {
        gameStatus = 0;
        reset();
    }
}

// the actual game
function gameOn() {
    noStroke();
    background(178, 121, 219);
    textSize(28);
    fill(212, 166, 245);
    text("score: " + score, 60, 30);
    text("lives: " + lives, 60, 60);
    fill(ballR, ballG, ballB);
    for (let i = 0; i < score + 1; i++) {
        ellipse(x, y, 20, 20);
    }
    fill(237, 168, 210);
    rectMode(CENTER);
    rect(mouseX, height - 10, 50, 30);
	y += speed;
    if (y > height) {
        y = -20;
        if (ballR == 151) lives -= 1;
	}
    if ((y > height - 10) && (x > mouseX - 20) && (x < mouseX + 20)) {
  	    y = -20;
        if (ballR == 151) {
            speed += .5;
            score += 1;
        }
        else {
            lives--;
            if (score != 0) score--;
        }
    }
	if (y == -20) {
  	    pickRandom();
    }
    if (lives == 0) gameStatus = 2;
}

// picks where the next ball will drop and what color it will be
function pickRandom(){
	x = random(20, width - 20);
    if (random(100) <= 75) {
        ballR = 151;
        ballG = 240;
        ballB = 237;
    }
    else {
        ballR = 240;
        ballG = 204;
        ballB = 151;
    }
}

// the screen that shows up when you run out of lives
function gameOff(){
    background(219, 121, 180);
    textAlign(CENTER);
    textSize(23);
    text('game over!\n', width / 2, height / 2);
    text("score: " + score, width / 2, height / 2 + 20);
    text('click to play again!', width / 2, height / 2 + 40);
}

// resets global variables for next game
function reset(){
  score = 0;
  speed = 2;
  y = -20;
  lives = 5;
}
 