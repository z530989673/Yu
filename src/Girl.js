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
var Girl = /** @class */ (function (_super) {
    __extends(Girl, _super);
    function Girl(m, path, indexH, indexW) {
        return _super.call(this, m, path, indexH, indexW, false, []) || this;
    }
    Girl.prototype.wakeup = function (checkPoint) {
    };
    Girl.prototype.move = function () {
    };
    return Girl;
}(Character));
//# sourceMappingURL=Girl.js.map