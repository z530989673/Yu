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
var BallSwitch = /** @class */ (function (_super) {
    __extends(BallSwitch, _super);
    function BallSwitch(m, path, indexW, indexH, stoneId) {
        var _this = _super.call(this, m, path, indexW, indexH, 1, 1, false) || this;
        _this.switchX = indexW;
        _this.switchY = indexH;
        var StandEvent = new GameEvent("standPos", [indexW, indexH], _this);
        EventCenter.addEventListener(StandEvent, _this.standStone);
        _this.stoneId = stoneId;
        return _this;
    }
    BallSwitch.prototype.standStone = function (e) {
        var Pos = e.eventArgs;
        if (e.eventInst.switchX == Pos[1] && e.eventInst.switchY == Pos[0]) {
            var Event = new GameEvent("ballSwitchTouch", e.eventInst.stoneId, this);
            EventCenter.dispatchAll(Event);
        }
    };
    return BallSwitch;
}(GameObject));
//# sourceMappingURL=BallSwitch.js.map