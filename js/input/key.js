var Key = function(root, config) {
    this.root = root;

    this.isPressed = false;

    //this.value
    //this.code

    for(var key in config) {
        this[key] = config[key];
    }
}

Key.prototype.press = function() {
    this.isPressed = true;

    return this;
}

Key.prototype.release = function() {
    this.isPressed = false;

    return this;
}

Key.prototype.process = function() {
    if(root.input.keyboard.shiftPressed) {

    }

    if(root.input.keyboard.altPressed) {

    }

    if(root.input.keyboard.ctrlPressed) {

    }
}
