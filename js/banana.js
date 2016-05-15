var BananaJs = function(config) {
    this.renderer = new Renderer();
    this.physics = new Physics(this.renderer.width, this.renderer.height);
    this.input = new Input(config.input);
    /*
    this.renderer.canvas.oncontextmenu = this.input.mouse.rightClick;
    this.renderer.canvas.onmousedown = this.input.mouse.mouseDown;
    this.renderer.canvas.onmouseup = this.input.mouse.mouseUp;
    this.renderer.canvas.onmousemove = this.input.mouse.mouseMove;*/
}

BananaJs.prototype.addEntity = function(entity) {
    this.physics.composites.push(entity);
}

BananaJs.prototype.start = function() {
    this.bindInput();
    this.tick();
}

BananaJs.prototype.tick = function() {
    this.physics.frame(this.renderer.framerate);
    
    var entities = this.physics.composites;
    
    this.renderer.draw(entities);
    
    var self = this;
	 
    requestAnimationFrame(function() { 
	self.tick(); 
    }, self.renderer.framerate);
}

BananaJs.prototype.bindInput = function() {
    this.input.mouse.onRightClick.bind(this);
    this.input.mouse.onMouseDown.bind(this);
    this.input.mouse.onMouseUp.bind(this);
    this.input.mouse.onMouseMove.bind(this);
    
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
    
    //this.renderer.canvas.onmousemove = this.input.mouse.onMouseMove;
}



