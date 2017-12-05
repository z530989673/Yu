/*
* name;
*/
var NodeHeap = /** @class */ (function () {
    function NodeHeap() {
        this.mapNodes = [];
    }
    NodeHeap.prototype.GetSize = function () {
        return this.mapNodes.length;
    };
    NodeHeap.prototype.Add = function (n) {
        this.mapNodes.push(n);
        var index = this.mapNodes.length - 1;
        while (index > 0) {
            if (this.mapNodes[index].weight > this.mapNodes[index - 1].weight) {
                NodeHeap.tmpNode = this.mapNodes[index];
                this.mapNodes[index] = this.mapNodes[index - 1];
                this.mapNodes[index - 1] = NodeHeap.tmpNode;
                index--;
            }
            else
                break;
        }
    };
    NodeHeap.prototype.Pop = function () {
        if (this.mapNodes.length == 0)
            return null;
        else
            return this.mapNodes.pop();
    };
    return NodeHeap;
}());
//# sourceMappingURL=NodeHeap.js.map