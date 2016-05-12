function Particle(pos) {
	this.pos = (new Vec2()).mutableSet(pos);
	this.lastPos = (new Vec2()).mutableSet(pos);
}