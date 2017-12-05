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
var Latern = /** @class */ (function (_super) {
    __extends(Latern, _super);
    function Latern(m, path, indexW, indexH, sW, sH, laternId, switchX, switchY) {
        var _this = _super.call(this, m, path, indexW, indexH, sW, sH, false) || this;
        _this.switchX = switchX;
        _this.switchY = switchY;
        var StandEvent = new GameEvent("standPos", [indexW, indexH], _this);
        EventCenter.addEventListener(StandEvent, _this.standLatern);
        _this.laternId = laternId;
        return _this;
    }
    Latern.prototype.standLatern = function (e) {
        var Pos = e.eventArgs;
        if (this.switchX == Pos[0] && this.switchY == Pos[1]) {
            var Event = new GameEvent("standMusicStone", this.laternId, this);
            EventCenter.dispatchAll(Event);
        }
    };
    return Latern;
}(GameObject));
//# sourceMappingURL=Latern.js.map