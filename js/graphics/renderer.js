window.requestAnimFrame = function(graphics, callback, framerate) {
		//window.setTimeout(callback.apply(graphics), 1000 / framerate);
	}
		
var Renderer = function(config = {}) {
	this.framerate = 60;
	
	requestAnimationFrame = (function(callback, framerate) {
	    return window.requestAnimationFrame || 
	    	window.webkitRequestAnimationFrame || 
	    	window.mozRequestAnimationFrame || 
	    	window.oRequestAnimationFrame || 
	    	window.msRequestAnimationFrame ||
	    	function (callback) {
				window.setTimeout(callback, (1000/frameRate));
			};
	})();
	
	this.init(config);
}

Renderer.prototype.init = function(config) {
	for(var k in config) {
		this[k] = config[k];
	}
	
	if(!this.canvas) {
		var el = document.createElement('canvas');
		
		el.setAttribute('width', 320);
		el.setAttribute('height', 180); 
		
		var body = document.getElementsByTagName('body'); console.log(body);
		
		body[0].appendChild(el);
		
		this.canvas = el;
		this.ctx = el.getContext('2d');
	}

	this.entities = [];
}

Renderer.prototype.draw = function() {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.ctx.beginPath();
    this.ctx.rect(0, 75, 100, 50);
    this.ctx.fillStyle = '#8ED6FF';
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
}

Renderer.prototype.render = function() { //console.log(this); 
	this.draw();
	
	var self = this;
	
	requestAnimationFrame(function() { 
		self.render(); 
	}, this.framerate);
}








