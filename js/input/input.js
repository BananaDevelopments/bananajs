var Input = function(root, config) {
    this.root = root;

    this.mouse = new Mouse(root, config.mouse);
    this.keyboard = new keyboard(root, config.keyboard);
}

Input.prototype.process = function() {
    //this.mouse.process();
    this.keyboard.process();
}

Input.prototype.off = function(context) {
    this.mouse.off();
    this.keyboard.off();
}
