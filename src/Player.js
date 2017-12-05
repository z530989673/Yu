/*
* name;
*/
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus[PlayerStatus["Idle"] = 0] = "Idle";
    PlayerStatus[PlayerStatus["Move"] = 1] = "Move";
})(PlayerStatus || (PlayerStatus = {}));
var Player = /** @class */ (function () {
    function Player(m, path, indexH, indexW) {
        this.indexW = 0;
        this.indexH = 0;
        this.moveSpeed = 500;
        this.stopTimeSpeed = 2000;
        this.status = PlayerStatus.Idle;
        this.dirW = 0;
        this.dirH = 0;
        this.wayPoints = [];
        this.saveW = 0;
        this.saveH = 0;
        this.isHoldFirefly = false;
        this.frameCount = 0;
        this.map = m;
        this.Save(indexW, indexH);
        this.filter = new Laya.GlowFilter("#08f7ce", 10, -1, -1);
        this.indexW = indexW;
        this.indexH = indexH;
        this.image = new Sprite();
        this.image.loadImage("../laya/assets/character/boy_" + path + ".png");
        //this.image.zOrder = indexH;
        this.map.AddObject(this.image);
        this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
        //this.image.scale(GameMap.nodeLength / 128,GameMap.nodeLength / 128);
        var point = this.image.localToGlobal(new Point(GameMap.nodeLength / 2, GameMap.nodeLength));
        Yu.CustomShaderValue.pointPos = [point.x, point.y];
        Laya.timer.frameLoop(1, this, this.Update);
        Laya.timer.loop(100, this, this.ChangeBlur);
        Laya.loader.load("../laya/pages/firefly.part", Handler.create(this, this.onHoldParticleLoaded), null, Loader.JSON);
        Laya.loader.load("../laya/pages/timeStop.part", Handler.create(this, this.onParticleLoaded), null, Loader.JSON);
        EventCenter.addEventListener(new GameEvent("holdFirefly", null, this), this.OnHoldFirefly);
        EventCenter.addEventListener(new GameEvent("LightEnableChanged", null, this), this.OnLightEnableChanged);
    }
    Player.prototype.Reset = function () {
        Laya.timer.clearAll(this);
    };
    Player.prototype.onHoldParticleLoaded = function (settings) {
        if (settings.textureName.search("../laya/assets/") == -1)
            settings.textureName = "../laya/assets/" + settings.textureName;
        this.holdParticle = new Particle2D(settings);
        this.holdParticle.stop();
        this.holdParticle.emitter.minEmissionTime = 0.1;
        this.holdParticle.emitter.stop();
        this.holdParticle.zOrder = 100;
        this.map.AddObject(this.holdParticle);
    };
    Player.prototype.onParticleLoaded = function (settings) {
        if (settings.textureName.search("../laya/assets/") == -1)
            settings.textureName = "../laya/assets/" + settings.textureName;
        this.particle = new Particle2D(settings);
        this.particle.emitter.start();
        this.particle.emitter.minEmissionTime = 0.1;
        this.particle.play();
        Layer.AddObjects(this.particle);
        this.particle.x = Laya.stage.width / 2;
        this.particle.y = Laya.stage.height / 2;
    };
    Player.prototype.ChangeBlur = function () {
        this.frameCount++;
        {
            this.filter.blur = this.frameCount % 20;
            if (this.filter.blur > 10)
                this.filter.blur = 20 - this.filter.blur;
            this.image.filters = [this.filter];
        }
    };
    Player.prototype.Update = function () {
        if (this.isHoldFirefly) {
            this.holdParticle.emitter.start();
            this.holdParticle.play();
            this.holdParticle.x = this.image.x + GameMap.nodeLength / 2;
            this.holdParticle.y = this.image.y + GameMap.nodeLength / 2;
        }
        else {
            if (this.holdParticle != null) {
                this.holdParticle.emitter.stop();
                this.holdParticle.stop();
            }
        }
        var point = this.image.localToGlobal(new Point(GameMap.nodeLength / 2, GameMap.nodeLength));
        Yu.CustomShaderValue.pointPos = [point.x, point.y];
        if (this.status == PlayerStatus.Idle)
            return;
        else if (this.status == PlayerStatus.Move) {
            var currentPosW = this.image.x;
            var currentPosH = this.image.y;
            var destPosW = this.map.GetPosW(this.indexW);
            var destPosH = this.map.GetPosH(this.indexH);
            var valueW = destPosW - currentPosW;
            var valueH = destPosH - currentPosH;
            currentPosW += Laya.timer.delta / 1000 * this.moveSpeed * this.dirW;
            currentPosH -= Laya.timer.delta / 1000 * this.moveSpeed * this.dirH;
            if (valueW * (destPosW - currentPosW) <= 0 &&
                valueH * (destPosH - currentPosH) <= 0) {
                currentPosH = destPosH;
                currentPosW = destPosW;
                this.CheckNextWayPoint();
            }
            this.image.pos(currentPosW, currentPosH);
        }
    };
    Player.prototype.CheckNextWayPoint = function () {
        if (this.wayPoints.length == 0) {
            this.status = PlayerStatus.Idle;
            Laya.timer.once(500, this, this.TurnLight);
        }
        else {
            var n = this.wayPoints.pop();
            var pos = [n.indexW, n.indexH, this.map.level];
            EventCenter.dispatchAll(new GameEvent("standPos", pos, this));
            if (this.map.IsWalkable(n.indexH, n.indexW)) {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
                this.ChangeDir();
                this.indexH = n.indexH;
                this.indexW = n.indexW;
            }
            else
                this.status = PlayerStatus.Idle;
        }
    };
    Player.prototype.ChangeDir = function () {
        var str = "back";
        if (this.dirW == 0 && this.dirH == -1)
            str = "front";
        else if (this.dirW == 1 && this.dirH == 0)
            str = "right";
        else if (this.dirW == -1 && this.dirH == 0)
            str = "left";
        this.image.graphics.clear();
        this.image.loadImage("../laya/assets/character/boy_" + str + ".png");
    };
    Player.prototype.MoveTo = function (checkPoints) {
        Laya.timer.clear(this, this.TurnLight);
        this.wayPoints = checkPoints;
        var checkPoint = checkPoints.pop();
        if (this.status != PlayerStatus.Move) {
            this.dirW = checkPoint.indexW - this.indexW;
            this.dirH = checkPoint.indexH - this.indexH;
            this.indexH = checkPoint.indexH;
            this.indexW = checkPoint.indexW;
            this.status = PlayerStatus.Move;
            this.ChangeDir();
        }
    };
    Player.prototype.Save = function (w, h) {
        this.saveW = w;
        this.saveH = h;
    };
    Player.prototype.Load = function () {
        this.map.RestoreUpdate();
        this.status = PlayerStatus.Idle;
        this.indexW = this.saveW;
        this.indexH = this.saveH;
        //this.image.zOrder = this.indexH;
        this.image.pos(this.map.GetPosW(this.indexW), this.map.GetPosH(this.indexH));
    };
    Player.prototype.GexX = function () {
        return this.image.x + GameMap.nodeLength / 2;
    };
    Player.prototype.GexY = function () {
        return this.image.y + GameMap.nodeLength / 2;
    };
    Player.prototype.GetUpperX = function () {
        return this.image.x;
    };
    Player.prototype.GetUpperBound = function () {
        return this.image.y;
    };
    Player.prototype.GetLowerBound = function () {
        return this.image.y + GameMap.nodeLength;
    };
    Player.prototype.GetRect = function () {
        var x = this.image.x;
        var y = this.image.y;
        return new Rectangle(x, y, this.image.width * GameMap.nodeLength / 128 - 1, this.image.height * GameMap.nodeLength / 128 - 1);
    };
    Player.prototype.Intersects = function (rect) {
        return this.GetRect().intersects(rect);
    };
    Player.prototype.TurnLight = function (args) {
        EventCenter.dispatchAll(new GameEvent("TurnLight", this, this));
    };
    Player.prototype.OnHoldFirefly = function (e) {
        var inst = e.eventInst;
        inst.isHoldFirefly = true;
        inst.map.RestoreUpdate();
    };
    Player.prototype.OnLightEnableChanged = function (e) {
        var inst = e.eventInst;
        inst.isHoldFirefly = false;
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map