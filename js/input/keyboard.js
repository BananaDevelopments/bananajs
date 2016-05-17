var Keyboard = function(root, config) {
    this.root = root;

    this.layouts = {};
    this.currentLayout = 'default';

    this.init(config.layouts);

    this.shiftPressed = false;
    this.altPressed = false;
    this.ctrlPressed = false;
}

Keyboard.prototype.init = function(layouts) {
    for(var key in layouts) {
        this.addLayout(key, layouts[key]);
    }
}

Keyboard.prototype.addLayout = function(key, layout) {
    this.layouts[key] = this.parseLayout(layout);
}

Keyboard.prototype.parseLayout = function(layout) {
    var keys = {};

    for(var key in layout) {
        keys[key] = new Key(this.root, layout[key]);
    }

    return keys;
}

Keyboard.prototype.bindEvents = function() {
    var canvas = this.root.renderer.canvas;
    var self = this;

    canvas.onkeydown = function(e, self) {
        var code = e.keyCode;

        self.checkModifiers(true, self);

        self.find(code).press();
    }

    canvas.onkeyup = function(e, self) {
        var code = e.keyCode;

        self.checkModifiers(false, self);

        self.find(code).release();
    }
}

Keyboard.prototype.checkModifiers = function(state, self) {
    if(code == 16) {
        self.shiftPressed = state;
    }

    if(code == 17) {
        self.ctrlPressed = state;
    }

    if(code == 18) {
        self.altPressed = state;
    }
}

Keyboard.prototype.find = function(code) {
    return this.layouts[this.currentLayout][code];
}

Keyboard.prototype.process = function() {
    for(var key in this.layouts[this.currentLayout]) {
        this.layouts[this.currentLayout][key].process();
    }
}
