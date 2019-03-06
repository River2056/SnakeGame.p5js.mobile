const START = 'START';
const PAUSE = 'PAUSE';
const RUNNING = 'RUNNING';
var state;
var easy;
var normal;
var hard;

var s;
var food;
var up;
var down;
var left;
var right;
var scl = 20;
var score = 0;
var speed = 6;

function checkIfPressed(pressX, pressY, pos) {
  return (pressX > pos.x && pressX < pos.x + pos.width) && (pressY > pos.y && pressY < pos.y + pos.height);
}

function mousePressed() {
  if(checkIfPressed(mouseX, mouseY, easy)) {
    state = RUNNING;
    speed = 8;
  } else if (checkIfPressed(mouseX, mouseY, normal)) {
    state = RUNNING;
    speed = 12;
  } else if (checkIfPressed(mouseX, mouseY, hard)) {
    state = RUNNING;
    speed = 24;
  }

  if(checkIfPressed(mouseX, mouseY, up)) {
    s.dir(0, -1);
  } else if (checkIfPressed(mouseX, mouseY, down)) {
    s.dir(0, 1);
  } else if (checkIfPressed(mouseX, mouseY, left)) {
    s.dir(-1, 0);
  } else if (checkIfPressed(mouseX, mouseY, right)) {
    s.dir(1, 0);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = START;
  easy = new Dir(width / 2 - 110, 160, 200, 100);
  normal = new Dir(width / 2 - 110, 310, 200, 100);
  hard = new Dir(width / 2 - 110, 460, 200, 100);
  up = new Dir((width / 8) * 5, (height / 8) * 6, width / 6, height / 8); // up
  down = new Dir((width / 8) * 5, (height / 8) * 7, width / 6, height / 8); // down
  left = new Dir((width / 10) * 4.571, (height / 10) * 8.1, width / 6, height / 8); // left
  right = new Dir((width / 10) * 7.93, (height / 10) * 8.1, width / 6, height / 8); // right
  s = new Snake(scl);
  food = new Food(scl);
}

function draw() {
  background(0);
  switch(state) {
    case START:
      textSize(40);
      text("SNAKE GAME", width / 2, 50);
      textSize(30);
      text("choose difficulty: ", width / 2, 90);
      textAlign(CENTER);
      easy.btnShow('Easy🍰');
      normal.btnShow('Normal🤔');
      hard.btnShow('Hard💀');
      break;
    
    case RUNNING:
      frameRate(speed);
      up.show();
      down.show();
      left.show();
      right.show();
      fill(255);
      textSize(30);
      textAlign(CENTER);
      text("SCORE :  ", width / 2 - 40, 30);
      text(score, width / 2 + 30, 30);
      s.dead();
      s.update();
      stroke(0);
      s.display();
      food.display();
      if (s.eat(food)) {
        score++;
        food = new Food(scl);
      }
      break;
  }
}
