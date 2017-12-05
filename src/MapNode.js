/*
* name;
*/
var MapNode = /** @class */ (function () {
    function MapNode(h, w) {
        this.indexH = h;
        this.indexW = w;
        this.weight = 100000;
        this.parentIndexH = -1;
        this.parentIndexW = -1;
        this.iterLength = 0;
    }
    MapNode.prototype.Clear = function () {
        this.weight = 100000;
        this.parentIndexH = -1;
        this.parentIndexW = -1;
        this.iterLength = 0;
    };
    MapNode.Copy = function (from, to) {
        to.indexH = from.indexH;
        to.indexW = from.indexW;
        to.weight = from.weight;
        to.parentIndexH = from.parentIndexH;
        to.parentIndexW = from.parentIndexW;
    };
    return MapNode;
}());
//# sourceMappingURL=MapNode.js.map