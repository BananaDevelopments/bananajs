
/*
Copyright 2013 Sub Protocol and other contributors
http://subprotocol.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// A simple 2-dimensional vector implementation

function Vec2(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vec2.prototype.add = function(v) {
	return new Vec2(this.x + v.x, this.y + v.y);
}

Vec2.prototype.sub = function(v) {
	return new Vec2(this.x - v.x, this.y - v.y);
}

Vec2.prototype.mul = function(v) {
	return new Vec2(this.x * v.x, this.y * v.y);
}

Vec2.prototype.div = function(v) {
	return new Vec2(this.x / v.x, this.y / v.y);
}

Vec2.prototype.scale = function(coef) {
	return new Vec2(this.x*coef, this.y*coef);
}

Vec2.prototype.mutableSet = function(v) {
	this.x = v.x;
	this.y = v.y;
	return this;
}

Vec2.prototype.mutableAdd = function(v) {
	this.x += v.x;
	this.y += v.y;
	return this;
}

Vec2.prototype.mutableSub = function(v) {
	this.x -= v.x;
	this.y -= v.y;
	return this;
}

Vec2.prototype.mutableMul = function(v) {
	this.x *= v.x;
	this.y *= v.y;
	return this;
}

Vec2.prototype.mutableDiv = function(v) {
	this.x /= v.x;
	this.y /= v.y;
	return this;
}

Vec2.prototype.mutableScale = function(coef) {
	this.x *= coef;
	this.y *= coef;
	return this;
}

Vec2.prototype.equals = function(v) {
	return this.x == v.x && this.y == v.y;
}

Vec2.prototype.epsilonEquals = function(v, epsilon) {
	return Math.abs(this.x - v.x) <= epsilon && Math.abs(this.y - v.y) <= epsilon;
}

Vec2.prototype.length = function(v) {
	return Math.sqrt(this.x*this.x + this.y*this.y);
}

Vec2.prototype.length2 = function(v) {
	return this.x*this.x + this.y*this.y;
}

Vec2.prototype.dist = function(v) {
	return Math.sqrt(this.dist2(v));
}

Vec2.prototype.dist2 = function(v) {
	var x = v.x - this.x;
	var y = v.y - this.y;
	return x*x + y*y;
}

Vec2.prototype.normal = function() {
	var m = Math.sqrt(this.x*this.x + this.y*this.y);
	return new Vec2(this.x/m, this.y/m);
}

Vec2.prototype.dot = function(v) {
	return this.x*v.x + this.y*v.y;
}

Vec2.prototype.angle = function(v) {
	return Math.atan2(this.x*v.y-this.y*v.x,this.x*v.x+this.y*v.y);
}

Vec2.prototype.angle2 = function(vLeft, vRight) {
	return vLeft.sub(this).angle(vRight.sub(this));
}

Vec2.prototype.rotate = function(origin, theta) {
	var x = this.x - origin.x;
	var y = this.y - origin.y;
	return new Vec2(x*Math.cos(theta) - y*Math.sin(theta) + origin.x, x*Math.sin(theta) + y*Math.cos(theta) + origin.y);
}

Vec2.prototype.toString = function() {
	return "(" + this.x + ", " + this.y + ")";
}

