function Food(scl) {
    this.scl = scl;
    this.x = floor(random(this.scl, width - this.scl) / this.scl) * this.scl;
    this.y = floor(random(this.scl, height - this.scl) / this.scl) * this.scl;

    this.display = function () {
        fill(255, 100, 100);
        rect(this.x, this.y, this.scl, this.scl);
    }
}

function Snake(scl) {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.scl = scl;
    this.tail = [];
    this.len = 0;

    // direction
    this.dir = function (x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    // eat the food
    this.eat = function (food) {
        var d = dist(this.x, this.y, food.x, food.y);
        if (d < this.scl) {
            this.len++;
            return true;
        } else {
            return false;
        }
    }

    // movement
    this.update = function () {
        // tail movement
        if (this.len === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.len - 1] = createVector(this.x, this.y);

        // head movement
        this.x = this.x + this.xSpeed * this.scl;
        this.y = this.y + this.ySpeed * this.scl;


        // edge, to the other side
        if (this.x + this.scl > width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = width;
        }

        if (this.y + this.scl > height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = height;
        }
    }

    // check death
    this.dead = function () {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.len = 0;
                this.tail = [];
                score = 0;
            }
        }
    }

    // display on browser
    this.display = function () {
        fill(255);
        for (var i = 0; i < this.len; i++) {
            rect(this.tail[i].x, this.tail[i].y, this.scl, this.scl);
        }

        rect(this.x, this.y, this.scl, this.scl);

    }



}

function Dir(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.show = function () {
        fill(255, 255, 255, 30);
        stroke(0);
        strokeWeight(1);
        rect(this.x, this.y, this.width, this.height);
    }

    this.btnShow = function (name) {
        fill(255, 255, 255);
        stroke(0);
        strokeWeight(4);
        // rect(this.x, this.y, this.width, this.height);
        textSize(24);
        textAlign(CENTER);
        text(name, this.x + this.width / 2, this.y + this.height / 2);
    }

}

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
    if (checkIfPressed(mouseX, mouseY, easy)) {
        state = RUNNING;
        speed = 8;
    } else if (checkIfPressed(mouseX, mouseY, normal)) {
        state = RUNNING;
        speed = 12;
    } else if (checkIfPressed(mouseX, mouseY, hard)) {
        state = RUNNING;
        speed = 24;
    }

    if (checkIfPressed(mouseX, mouseY, up)) {
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
    switch (state) {
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
