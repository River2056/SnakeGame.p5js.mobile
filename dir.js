function Dir(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.mapDir = function() {
        fill(255, 255, 255, 30);
        stroke(0);
        rect(this.x, this.y, this.width, this.height);
    }

}