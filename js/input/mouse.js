var Mouse = function(config) {
    this.mouse = new Vec2(0,0);
    this.mouseDown = false;
    this.draggedEntity = null;
    this.selectionRadius = 20;
    this.highlightColor = "#4f545c";
    
    for(var item in config) {
        this[item] = config[item];
    }
}

