var BananaJs = function(config) {
    this.renderer = new Renderer();
    this.physics = new Physics(this.renderer.width, this.renderer.height);
    this.input = new Input(this, config.input);

    this.createShortcuts();
}

BananaJs.prototype.addEntity = function(entity) {
    this.physics.composites.push(entity);
}

BananaJs.prototype.start = function() {
    this.bindInput();
    this.tick();
}

BananaJs.prototype.tick = function() {
    this.physics.frame(this.renderer.framerate, this.input.mouse);

    var entities = this.physics.composites;

    this.renderer.draw(entities);

    var self = this;

    requestAnimationFrame(function() {
	self.tick();
    }, self.renderer.framerate);
}

BananaJs.prototype.bindInput = function() {
    var self = this;

    this.renderer.canvas.oncontextmenu = function(e) {
        return self.input.mouse.onRightClick.call(self, e, self);
    }

    this.renderer.canvas.onmousedown = function(e) {
        return self.input.mouse.onMouseDown.call(self, e, self);
    }

    this.renderer.canvas.onmouseup = function(e) {
        return self.input.mouse.onMouseUp.call(self, e, self);
    }

    this.renderer.canvas.onmousemove = function(e) {
        return self.input.mouse.onMouseMove.call(self, e, self);
    }

    this.renderer.canvas.onmousemove = function(e) {
        return self.input.mouse.onMouseMove.call(self, e, self);
    }
}

BananaJs.prototype.createShortcuts = function() {
    this.mouse = this.input.mouse;
    this.keyboard = this.input.keyboard;
    this.canvas = this.renderer.canvas;
}
