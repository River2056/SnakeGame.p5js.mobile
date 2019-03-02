function Snake(scl) {
  this.x = 0;
  this.y = 0;
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.scl = scl;
  this.tail = [];
  this.len = 0;

  // direction
  this.dir = function(x, y) {
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
  this.update = function() {
    // tail movement
    if(this.len === this.tail.length) {
      for(var i = 0 ; i < this.tail.length - 1 ; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.len-1] = createVector(this.x, this.y);
    
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
  this.display = function() {
    fill(255);
    for(var i = 0 ; i < this.len ; i++) {
      rect(this.tail[i].x, this.tail[i].y, this.scl, this.scl);
    }

    rect(this.x, this.y, this.scl, this.scl);

  }



}
