var config = {
    input: {
        mouse: {
            onRightClick: function(e, object) { 
		e.preventDefault();
            },
            
            onMouseDown: function(e, object) {
		object.input.mouse.mouseDown = true;
                
                var nearest = object.physics.nearestEntity(object.input.mouse);
                
                if (nearest) { 
                    object.input.mouse.draggedEntity = nearest;
                    
                    object.renderer.additional.push(function() { 
                        this.ctx.beginPath();
                        this.ctx.arc(nearest.pos.x, nearest.pos.y, 8, 0, 2*Math.PI);
                        this.ctx.strokeStyle = object.input.mouse.highlightColor;
                        this.ctx.stroke(); 
                    });
                }
            },
            
            onMouseUp: function(e, object) {
		object.input.mouse.mouseDown = false;
		object.input.mouse.draggedEntity = null;
            },
	
            onMouseMove: function(e, object) { 
		var rect = object.renderer.canvas.getBoundingClientRect();
                
		object.input.mouse.cursor.x = e.clientX - rect.left; //console.log(object.input.mouse.cursor.x + ', ' + object.input.mouse.cursor.y);
		object.input.mouse.cursor.y = e.clientY - rect.top; 
            },
            
            onMouseOver: function(e, object) {
                    var nearest = object.input.mouse.draggedEntity || object.physics.nearestEntity(object.input.mouse);
                    
                    if (nearest) {
                        
                    }
            }
        }
    }
};

var bananaJs = new BananaJs(config);

var Shape = function(origin, radius, segments, spokeStiffness, treadStiffness) {
	var stride = (2*Math.PI)/segments;
	var i;
	
	var composite = new Composite();
	
	// particles
	for (i=0;i<segments;++i) {
		var theta = i*stride;
		composite.particles.push(new Particle(new Vec2(origin.x + Math.cos(theta)*radius, origin.y + Math.sin(theta)*radius)));
	}
	
	var center = new Particle(origin);
	composite.particles.push(center);
	
	// constraints
	for (i=0;i<segments;++i) {
		composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[(i+1)%segments], treadStiffness));
		composite.constraints.push(new DistanceConstraint(composite.particles[i], center, spokeStiffness))
		composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[(i+5)%segments], treadStiffness));
	}

	composite.draw = function(particles) { 
		this.ctx.beginPath();

		for(var i=0; i<particles.length - 1; i++) { 
			if(i < (particles.length - 2)) {
				this.ctx.moveTo(particles[i].pos.x, particles[i].pos.y);
				this.ctx.lineTo(particles[i + 1].pos.x, particles[i + 1].pos.y);
			} else {
				this.ctx.moveTo(particles[i].pos.x, particles[i].pos.y);
				this.ctx.lineTo(particles[0].pos.x, particles[0].pos.y);
			}
		} 

	    this.ctx.fillStyle = '#8ED6FF';
	    this.ctx.fill();
	    this.ctx.lineWidth = 1;
	    this.ctx.strokeStyle = 'black';
	    this.ctx.stroke(); 
	}
		
	return composite;
}

bananaJs.addEntity(Shape(new Vec2(500, 110), 90, 4, 1, 1));
bananaJs.addEntity(Shape(new Vec2(200,110), 90, 30, 0.3, 0.9));

bananaJs.start();