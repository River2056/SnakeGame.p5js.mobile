function Food(scl) {
    this.scl = scl;
    this.x = floor(random(this.scl, width - this.scl) / this.scl) * this.scl;
    this.y = floor(random(this.scl, height - this.scl) / this.scl) * this.scl;

    this.display = function() {
        fill(255, 100, 100);
        rect(this.x, this.y, this.scl, this.scl);
    }
}