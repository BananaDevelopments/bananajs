var r = new Renderer();
var physics = new Physics(r.width, r.height);

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

var shape = physics.composites.push(Shape(new Vec2(500, 110), 90, 4, 1, 1));
var shape2 = physics.composites.push(Shape(new Vec2(200,110), 50, 30, 0.3, 0.9));

var entities = physics.composites;

r.render(entities, physics);
