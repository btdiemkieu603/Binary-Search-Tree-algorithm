var panlimit = function(ev) {
    var box = new SVG.Box(this.viewbox())
    var bbox = this.bbox();
    if ( bbox.width <= box.width) {
        if ( box.x > bbox.x && box.x2 > bbox.x) {
            box.x = bbox.x;
        }
        if ( box.x < bbox.x &&  box.x2 < bbox.x2) {
            box.x = bbox.x2 - box.width;
        }
    } else {
        if(box.x < bbox.x) {
            box.x = bbox.x;
        }
        if (box.x2 > bbox.x2) {
            box.x = bbox.x2 - box.width;
        }
    }
    if ( bbox.height <= box.height) {
        if ( box.y > bbox.y && box.y2 > bbox.y) {
            box.y = bbox.y;
        }
        if ( box.y < bbox.y &&  box.y2 < bbox.y2) {
            box.y = bbox.y2 - box.height;
        }
    } else {
        if(box.y < bbox.y) {
            box.y = bbox.y;
        }
        if (box.y2 > bbox.y2) {
            box.y = bbox.y2 - box.height;
        }
    }
    
    this.viewbox(box)
};

function changeZoomFactor(draw) {
let bb = draw.bbox();
let zmw = (draw.width() / bb.w) * 0.9;
zmw = zmw > 1 ? 1 : zmw;
let zmh = (draw.height() / bb.h) * 0.9;
zmh = zmh > 1 ? 1 : zmh;
draw.panZoom({zoomMin: Math.min(zmw,zmh), zoomMax: 1});
}