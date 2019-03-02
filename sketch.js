var s;
var food;
var up;
var down;
var left;
var right;
var scl = 20;
var score = 0;

function checkIfPressed(pressX, pressY, pos) {
  return (pressX > pos.x && pressX < pos.x + pos.width) && (pressY > pos.y && pressY < pos.y + pos.height);
}

function mousePressed() {
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
  up = new Dir((width / 8) * 5, (height / 8) * 6, width / 6, height / 8); // up
  down = new Dir((width / 8) * 5, (height / 8) * 7, width / 6, height / 8); // down
  left = new Dir((width / 10) * 4.571, (height / 10) * 8.1, width / 6, height / 8); // left
  right = new Dir((width / 10) * 7.93, (height / 10) * 8.1, width / 6, height / 8); // right
  s = new Snake(scl);
  food = new Food(scl);
}

function draw() {
  background(0);
  up.mapDir();
  down.mapDir();
  left.mapDir();
  right.mapDir();
  fill(255);
  text("SCORE : ", width/2 - 40, 30);
  text(score, width/2 + 30, 30);
  textAlign(CENTER);
  textSize(26);
  frameRate(10);
  s.dead();
  s.update();
  stroke(0);
  s.display();
  food.display();
  if(s.eat(food)) {
    score++;
    food = new Food(scl);
  }
}
