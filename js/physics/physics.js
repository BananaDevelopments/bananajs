function Physics(width, height) {
	this.width = width;
	this.height = height;
	
	this.bounds = function (particle) {
		if (particle.pos.y > this.height-1)
			particle.pos.y = this.height-1;
		
		if (particle.pos.x < 0)
			particle.pos.x = 0;

		if (particle.pos.x > this.width-1)
			particle.pos.x = this.width-1;
	}
	
	// simulation params
	this.gravity = new Vec2(0,0.2);
	this.friction = 0.99;
	this.groundFriction = 0.8;
	
	// holds composite entities
	this.composites = [];
}

Physics.prototype.frame = function(step, mouse) {
	var i, j, c;

	for (c in this.composites) {
		for (i in this.composites[c].particles) {
			var particles = this.composites[c].particles;
			
			// calculate velocity
			var velocity = particles[i].pos.sub(particles[i].lastPos).scale(this.friction);
		
			// ground friction
			if (particles[i].pos.y >= this.height-1 && velocity.length2() > 0.000001) {
				var m = velocity.length();
				velocity.x /= m;
				velocity.y /= m;
				velocity.mutableScale(m*this.groundFriction);
			}
		
			// save last good state
			particles[i].lastPos.mutableSet(particles[i].pos);
		
			// gravity
			particles[i].pos.mutableAdd(this.gravity);
		
			// inertia  
			particles[i].pos.mutableAdd(velocity);
		}
	}
	
	// handle dragging of entities
	if (mouse.draggedEntity) { 
		mouse.draggedEntity.pos.mutableSet(mouse.cursor);
        }
		
	// relax
	var stepCoef = 1/step;
	for (c in this.composites) {
		var constraints = this.composites[c].constraints;
		for (i=0;i<step;++i)
			for (j in constraints)
				constraints[j].relax(stepCoef);
	}
	
	// bounds checking
	for (c in this.composites) {
		var particles = this.composites[c].particles;
		for (i in particles)
			this.bounds(particles[i]);
	} 
}

Physics.prototype.nearestEntity = function(mouse) {
	var c, i;
	var d2Nearest = 0;
	var entity = null;
	var constraintsNearest = null;
	
	// find nearest point
	for (c in this.composites) {
		var particles = this.composites[c].particles;
		for (i in particles) {
			var d2 = particles[i].pos.dist2(mouse.cursor);
			if (d2 <= mouse.selectionRadius*mouse.selectionRadius && (entity == null || d2 < d2Nearest)) {
				entity = particles[i]; 
				constraintsNearest = this.composites[c].constraints;
				d2Nearest = d2;
			}
		}
	}
	
	// search for pinned constraints for this entity
	for (i in constraintsNearest)
		if (constraintsNearest[i] instanceof PinConstraint && constraintsNearest[i].a == entity)
			entity = constraintsNearest[i];
	
	return entity;
}