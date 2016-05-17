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
		canvas.tabIndex = 1000;
	}

    this.entities = [];
    this.additional = [];
}

Renderer.prototype.draw = function(composites) {
	var c;

	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (c in composites) {
		// draw constraints
		var self = this;

		composites[c].draw.call(self, composites[c].particles);
	}

        for(var i in this.additional) { //console.log(i);
            this.additional[i].call(self);
        }
}
