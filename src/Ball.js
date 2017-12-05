var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Ball = /** @class */ (function (_super) {
    __extends(Ball, _super);
    function Ball(m, path, indexH, indexW, blockable, checkPoints) {
        return _super.call(this, m, path, indexH, indexW, blockable, checkPoints) || this;
    }
    Ball.prototype.Move = function () {
        var tmp = this.wayPoints;
        this.wayPoints = this.nextWayPoints;
        this.nextWayPoints = tmp;
        var checkPoint = this.wayPoints.pop();
        if (this.status != PlayerStatus.Move) {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = PlayerStatus.Move;
            // if (this.blockable)
            // this.map.SetStatus(this.indexH,this.indexW,NodeStatus.Block);
        }
    };
    Ball.prototype.MoveTo = function (checkPoints) {
        this.wayPoints = checkPoints;
        var checkPoint = checkPoints.pop();
        if (this.status != PlayerStatus.Move) {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            // this.ChangeDir();
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = PlayerStatus.Move;
            // if (this.blockable)
            // this.map.SetStatus(this.indexH,this.indexW,NodeStatus.Block);
        }
    };
    Ball.prototype.ClassName = function () {
        return "Ball";
    };
    Ball.prototype.CheckNextWayPoint = function () {
        if (this.dirLength != 0 && this.blockable)
            this.map.ReSetStatus(this.indexH - this.dirH, this.indexW - this.dirW);
        if (this.wayPoints.length == 0)
            this.status = PlayerStatus.Idle;
        else {
            var n = this.wayPoints.pop();
            // this.dirH = n.indexH - this.indexH;
            // this.dirW = n.indexW - this.indexW;
            // this.dirLength = Math.sqrt(this.dirH * this.dirH + this.dirW * this.dirW);
            // this.indexH = n.indexH;
            // this.indexW = n.indexW;
            // this.image.zOrder = this.indexH;
            // this.nextWayPoints.push(n);
            if (this.map.IsWalkable(n.indexH, n.indexW)) {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
                this.dirLength = Math.sqrt(this.dirH * this.dirH + this.dirW * this.dirW);
                this.indexH = n.indexH;
                this.indexW = n.indexW;
                if (this.blockable)
                    this.map.SetStatus(this.indexH, this.indexW, NodeStatus.Block);
                //this.image.zOrder = this.indexH;
            }
            else
                this.status = PlayerStatus.Idle;
        }
    };
    return Ball;
}(Character));
//# sourceMappingURL=Ball.js.map