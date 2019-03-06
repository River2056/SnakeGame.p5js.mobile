function Dir(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.show = function() {
        fill(255, 255, 255, 30);
        stroke(0);
        strokeWeight(1);
        rect(this.x, this.y, this.width, this.height);
    }

    this.btnShow = function(name) {
        fill(255, 255, 255);
        stroke(0);
        strokeWeight(4);
        // rect(this.x, this.y, this.width, this.height);
        textSize(24);
        textAlign(CENTER);
        text(name, this.x + this.width / 2, this.y + this.height / 2);
    }

}