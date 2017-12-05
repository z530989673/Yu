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
var Actress = /** @class */ (function (_super) {
    __extends(Actress, _super);
    function Actress(m, path, indexH, indexW, blockable, rootObject, speed) {
        if (rootObject === void 0) { rootObject = null; }
        if (speed === void 0) { speed = 500; }
        var _this = _super.call(this, m, "", indexH, indexW, blockable, []) || this;
        _this.currTargetObject = null;
        _this.frameCount = 0;
        _this.type = CharacterType.ACTRESS;
        _this.currTargetObject = rootObject;
        if (rootObject != null) {
            rootObject.SetCanTurn(false);
            Laya.timer.once(1000, _this, _this.FindNextTargetObject);
        }
        _this.image = new Sprite();
        _this.image.loadImage("../laya/assets/character/girl_" + path + ".png");
        //this.image.zOrder = indexH;
        _this.map.AddObject(_this.image);
        _this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
        //this.image.scale(GameMap.nodeLength / 128,GameMap.nodeLength / 128);
        _this.filter = new Laya.GlowFilter("#cef708", 10, -1, -1);
        Laya.timer.loop(100, _this, _this.ChangeBlur);
        _this.moveSpeed = speed;
        EventCenter.addEventListener(new GameEvent("LightEnableChanged", null, _this), _this.TargetObjectEnableChange);
        return _this;
    }
    Actress.prototype.SetVisible = function (v) {
        this.image.visible = v;
    };
    Actress.prototype.ChangeBlur = function () {
        this.frameCount++;
        {
            this.filter.blur = this.frameCount % 20;
            if (this.filter.blur > 10)
                this.filter.blur = 20 - this.filter.blur;
            this.image.filters = [this.filter];
        }
    };
    Actress.prototype.Update = function () {
        if (!this.isActive)
            return;
        if (this.status == PlayerStatus.Idle)
            return;
        else if (this.status == PlayerStatus.Move) {
            // if(this.map.level == 3)
            // {
            //     var deltaW = this.map.player.image.x - this.image.x-1200;
            //     var deltaH = this.map.player.image.y - this.image.y-500;
            //     this.moveSpeed = 10000000 /  (deltaW*deltaW*deltaW*deltaW + deltaH*deltaH*deltaH*deltaH);
            // }
            var currentPosW = this.image.x;
            var currentPosH = this.image.y;
            var destPosW = this.map.GetPosW(this.indexW);
            var destPosH = this.map.GetPosH(this.indexH);
            var valueW = destPosW - currentPosW;
            var valueH = destPosH - currentPosH;
            currentPosW += Laya.timer.delta / 1000 * this.moveSpeed * GameMap.globalSpeed * this.dirW;
            currentPosH -= Laya.timer.delta / 1000 * this.moveSpeed * GameMap.globalSpeed * this.dirH;
            if (valueW * (destPosW - currentPosW) <= 0 &&
                valueH * (destPosH - currentPosH) <= 0) {
                currentPosH = destPosH;
                currentPosW = destPosW;
                this.CheckNextWayPoint();
            }
            this.image.pos(currentPosW, currentPosH);
        }
    };
    Actress.prototype.CheckNextWayPoint = function () {
        if (this.dirLength != 0 && this.blockable)
            this.map.ReSetStatus(this.indexH - this.dirH, this.indexW - this.dirW);
        if (this.wayPoints.length == 0) {
            this.status = PlayerStatus.Idle;
            if (this.currTargetObject != null)
                Laya.timer.once(3000, this, this.FindNextTargetObject);
        }
        else {
            var n = this.wayPoints.pop();
            this.nextWayPoints.push(n);
            if (this.map.IsWalkable(n.indexH, n.indexW)) {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
                this.ChangeDir();
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
    Actress.prototype.ChangeDir = function () {
        var str = "back";
        if (this.dirW == 0 && this.dirH == -1)
            str = "front";
        else if (this.dirW == 1 && this.dirH == 0)
            str = "right";
        else if (this.dirW == -1 && this.dirH == 0)
            str = "left";
        this.image.graphics.clear();
        this.image.loadImage("../laya/assets/character/girl_" + str + ".png");
    };
    Actress.prototype.MoveTo = function (checkPoints) {
        this.wayPoints = checkPoints;
        var checkPoint = checkPoints.pop();
        if (this.status != PlayerStatus.Move) {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            this.ChangeDir();
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = PlayerStatus.Move;
            if (this.blockable)
                this.map.SetStatus(this.indexH, this.indexW, NodeStatus.Block);
        }
    };
    Actress.prototype.FindNextTargetObject = function () {
        if (this.currTargetObject == null)
            return;
        var NextTargetObject = this.currTargetObject.GetNextObject();
        if (NextTargetObject != null) {
            this.currTargetObject = NextTargetObject;
            this.map.MoveTo(NextTargetObject.indexH, NextTargetObject.indexW, this);
        }
    };
    //被吓到了赶紧跑回去
    Actress.prototype.FindPrevTargetObject = function () {
        var PrevTargetObject = this.currTargetObject.parent;
        if (PrevTargetObject != null) {
            Laya.timer.clear(this, this.FindNextTargetObject);
            this.currTargetObject = PrevTargetObject;
            this.map.MoveTo(PrevTargetObject.indexH, PrevTargetObject.indexW, this);
        }
    };
    Actress.prototype.TargetObjectEnableChange = function (e) {
        var inst = e.eventInst;
        if (inst.status != PlayerStatus.Move)
            inst.FindNextTargetObject();
    };
    Actress.prototype.GexX = function () {
        return this.image.x + GameMap.nodeLength / 2;
    };
    Actress.prototype.GexY = function () {
        return this.image.y + GameMap.nodeLength / 2;
    };
    return Actress;
}(Character));
//# sourceMappingURL=Actress.js.map