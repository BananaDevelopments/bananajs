function Composite() {
	this.particles = [];
	this.constraints = [];
	
	this.drawParticles = null;
	this.drawConstraints = null;
}

Composite.prototype.pin = function(index, pos) {
	pos = pos || this.particles[index].pos;
	var pc = new PinConstraint(this.particles[index], pos);
	this.constraints.push(pc);
	return pc;
}