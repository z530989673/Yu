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
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block(m, path, indexW, indexH, checkPoints, laternId, switchX, switchY) {
        var _this = _super.call(this, m, path, indexW, indexH, false, checkPoints) || this;
        _this.switchX = switchX;
        _this.switchY = switchY;
        var StandEvent = new GameEvent("standPos", [indexW, indexH], _this);
        EventCenter.addEventListener(StandEvent, _this.standStone);
        _this.laternId = laternId;
        return _this;
    }
    Block.prototype.standStone = function (e) {
        var Pos = e.eventArgs;
        if (this.switchX == Pos[1] && this.switchY == Pos[0]) {
            var Event = new GameEvent("standMusicStone", this.laternId, this);
            EventCenter.dispatchAll(Event);
        }
    };
    return Block;
}(Character));
//# sourceMappingURL=Block.js.map