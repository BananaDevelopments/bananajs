var Mouse = function(root, config) {
    this.root = root;
    
    this.cursor = new Vec2(0,0);
    this.mouseDown = false;
    this.draggedEntity = null;
    this.selectionRadius = 20;
    this.highlightColor = "#4f545c";
    
    this.currentLayout = 'default';
    
    this.layouts = {
        default: {
            oncontextmenu: function(e, object) { 
		e.preventDefault();
            },
            
            onmousedown: function(e, object) {
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
            
            onmouseup: function(e, object) {
		object.input.mouse.mouseDown = false;
		object.input.mouse.draggedEntity = null;
            },
	
            onmousemove: function(e, object) { 
		var rect = object.renderer.canvas.getBoundingClientRect();
                
		object.input.mouse.cursor.x = e.clientX - rect.left; //console.log(object.input.mouse.cursor.x + ', ' + object.input.mouse.cursor.y);
		object.input.mouse.cursor.y = e.clientY - rect.top; 
            }
        }
    };
    
    for(var item in config) {
        this[item] = config[item];
    }
    
    this.updateEvents();
}

Mouse.prototype.bindEvent = function(event, callback) {
    var root = root;
    
    root.renderer.canvas[event] = function(e) {
        return callback.call(root, e, root);
    }
}

Mouse.prototype.bindEvents = function(events) {
    var root = this.root;
    
    for(var event in events) {
        this.root.renderer.canvas[event] = function(e) {
            return callback.call(root, e, root);
        }
    }
}

Mouse.prototype.addLayout = function(key, layout) {
    this.layouts[key] = layout;
}

Mouse.prototype.setLayout = function(key) {
    this.currentLayout = key;
    
    this.updateEvents();
}

Mouse.prototype.updateEvents = function() {
    this.off();
    
    var events = this.layouts[this.currentLayout];
    
    this.bindEvents(events);
}

Mouse.prototype.off = function() {
    
}


