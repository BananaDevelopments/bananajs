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
				window.setTimeout(callback, (1000/framerate));
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
		
		el.setAttribute('width', 900);
		el.setAttribute('height', 500); 
		el.style.border = 'solid black 1px';
		
		this.width = 900;
		this.height = 500;

		var body = document.getElementsByTagName('body'); console.log(body);
		
		body[0].appendChild(el);
		
		this.canvas = el;
		this.ctx = el.getContext('2d');
	}
/*
	this.mouse = new Vec2(0,0);
	this.mouseDown = false;
	this.draggedEntity = null;
	this.selectionRadius = 20;
	this.highlightColor = "#4f545c";*/

	this.entities = [];
/*
	var _this = this;
	
	// prevent context menu
	this.canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};
	
	this.canvas.onmousedown = function(e) {
		_this.mouseDown = true;
		var nearest = _this.nearestEntity();
		if (nearest) {
			_this.draggedEntity = nearest;
		}
	};
	
	this.canvas.onmouseup = function(e) {
		_this.mouseDown = false;
		_this.draggedEntity = null;
	};
	
	this.canvas.onmousemove = function(e) {
		var rect = _this.canvas.getBoundingClientRect();
		_this.mouse.x = e.clientX - rect.left;
		_this.mouse.y = e.clientY - rect.top;
	};  */
}
/*
Renderer.prototype.draw = function() {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.ctx.beginPath();
    this.ctx.rect(0, 75, 100, 50);
    this.ctx.fillStyle = '#8ED6FF';
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
}*/

Renderer.prototype.render = function(entities, physics) { 
	this.draw(entities, physics); 
	
	var self = this;
	 
	requestAnimationFrame(function() { 
		self.render(entities, physics); 
	}, self.framerate);
}


Renderer.prototype.draw = function(composites, physics) { 
	physics.frame(this.framerate);

	var i, c;
	
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  
	/*
	for (c in composites) {
		// draw constraints
		if (composites[c].drawConstraints) {
			composites[c].drawConstraints(this.ctx, composites[c]);
		} else {
			var constraints = composites[c].constraints;
			for (i in constraints)
				constraints[i].draw(this.ctx);
		}
		
		// draw particles
		if (composites[c].drawParticles) {
			composites[c].drawParticles(this.ctx, composites[c]);
		} else {
			var particles = composites[c].particles;
			for (i in particles)
				particles[i].draw(this.ctx);
		}
	}*/

	for (c in composites) { 
		// draw constraints
		var self = this;

		composites[c].draw.call(self, composites[c].particles);
	}
	
	// highlight nearest / dragged entity
	/*var nearest = physics.draggedEntity || physics.nearestEntity();
	if (nearest) {
		this.ctx.beginPath();
		this.ctx.arc(nearest.pos.x, nearest.pos.y, 8, 0, 2*Math.PI);
		this.ctx.strokeStyle = this.highlightColor;
		this.ctx.stroke();
	}*/
}








