/*
* name;
*/
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
var Firefly = /** @class */ (function (_super) {
    __extends(Firefly, _super);
    function Firefly(m, path, indexH, indexW, blockable, checkPoints) {
        var _this = _super.call(this, m, path, indexH, indexW, blockable, checkPoints) || this;
        _this.isNeedReborn = true;
        _this.type = CharacterType.FIREFLY;
        _this.nextWayPoints = _this.nextWayPoints.reverse();
        _this.image.pivot(-35, -35);
        EventCenter.addEventListener(new GameEvent("holdFirefly", null, _this), _this.OnHoldFirefly);
        return _this;
    }
    Firefly.prototype.Move = function () {
        var tmp = this.wayPoints;
        this.wayPoints = this.nextWayPoints.reverse();
        this.nextWayPoints = tmp;
        var checkPoint = this.wayPoints.pop();
        this.nextWayPoints.push(checkPoint);
        if (this.status != PlayerStatus.Move) {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = PlayerStatus.Move;
            if (this.blockable)
                this.map.SetStatus(this.indexH, this.indexW, NodeStatus.Block);
        }
    };
    Firefly.prototype.OnActive = function () {
        if (this.isNeedReborn) {
            this.image.visible = true;
            this.enableCollision = true;
        }
    };
    Firefly.prototype.OnHoldFirefly = function (e) {
        var f = e.eventArgs;
        var inst = e.eventInst;
        if (f == inst) {
            inst.image.visible = false;
            inst.enableCollision = false;
            Laya.timer.once(5000, inst, inst.OnActive);
        }
    };
    return Firefly;
}(Character));
//# sourceMappingURL=Firefly.js.map