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
var ObjectLight = /** @class */ (function (_super) {
    __extends(ObjectLight, _super);
    function ObjectLight(m, indexH, indexW, sH, sW, blockable, enable) {
        if (enable === void 0) { enable = true; }
        var _this = _super.call(this, m, "", indexH, indexW, sH, sW, blockable) || this;
        _this.parent = null;
        _this.children = [];
        _this.selfIdx = 0;
        _this.enable = true;
        _this.canTurn = true;
        _this.onTexPath = "../laya/assets/item/icon_lantern.png";
        _this.offTexPath = "../laya/assets/item/icon_nolantern.png";
        _this.enable = enable;
        var path = enable ? _this.onTexPath : _this.offTexPath;
        _this.image = new Sprite();
        _this.image.loadImage(path);
        //this.image.zOrder = indexH;
        _this.map.AddObject(_this.image);
        _this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
        EventCenter.addEventListener(new GameEvent("TurnLight", null, _this), _this.CheckTurnLight);
        return _this;
    }
    ObjectLight.prototype.AddChild = function (light) {
        light.selfIdx = this.children.length;
        this.children.push(light);
        light.parent = this;
    };
    ObjectLight.prototype.AddParent = function (light) {
        light.AddChild(this);
    };
    ObjectLight.prototype.IsChild = function (light) {
        return this.children[light.selfIdx] == light;
    };
    ObjectLight.prototype.GetNextObject = function () {
        for (var i = 0; i < this.children.length; ++i) {
            var child = this.children[i];
            if (child.enable)
                return child;
        }
    };
    ObjectLight.prototype.SetCanTurn = function (canTurn) {
        this.canTurn = canTurn;
    };
    ObjectLight.prototype.SetEnable = function (enable) {
        this.enable = enable;
        var path = enable ? this.onTexPath : this.offTexPath;
        this.image.graphics.clear();
        this.image.loadImage(path);
        // this.image.visible = enable;
        EventCenter.dispatchAll(new GameEvent("LightEnableChanged", [this, enable], this));
    };
    ObjectLight.prototype.GetEnable = function (enable) {
        return this.enable;
    };
    ObjectLight.prototype.IntersectsXY = function (PosX, PosY) {
        for (var i = 0; i < this.sizeW; ++i) {
            if (this.indexW + i == PosX) {
                for (var j = 0; j < this.sizeH; ++j) {
                    if (this.indexH + j == PosY)
                        return true;
                }
            }
        }
        return false;
    };
    ObjectLight.prototype.CheckTurnLight = function (e) {
        var player = e.eventArgs;
        var inst = e.eventInst;
        if (!inst.canTurn)
            return;
        if (inst.Intersects(player.GetRect())) {
            if (inst.enable)
                inst.SetEnable(false);
            else if (player.isHoldFirefly)
                inst.SetEnable(true);
        }
    };
    return ObjectLight;
}(GameObject));
//# sourceMappingURL=ObjectLight.js.map