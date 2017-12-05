/*
* name;
*/
var CharacterType;
(function (CharacterType) {
    CharacterType[CharacterType["ACTRESS"] = 0] = "ACTRESS";
    CharacterType[CharacterType["FIREFLY"] = 1] = "FIREFLY";
})(CharacterType || (CharacterType = {}));
var Character = /** @class */ (function () {
    function Character(m, path, indexH, indexW, blockable, checkPoints) {
        this.indexW = 0;
        this.indexH = 0;
        this.moveSpeed = 1000;
        this.waitTime = 0.4;
        this.status = PlayerStatus.Idle;
        this.dirW = 0;
        this.dirH = 0;
        this.dirLength = 0;
        this.blockable = false;
        this.isActive = true;
        this.wayPoints1 = [];
        this.wayPoints2 = [];
        this.enableCollision = true;
        this.map = m;
        this.indexW = indexW;
        this.indexH = indexH;
        this.blockable = blockable;
        if (this.blockable)
            this.map.SetStatus(this.indexH, this.indexW, NodeStatus.Block);
        if (path != "") {
            this.image = new Sprite();
            this.image.loadImage(path);
            this.image.zOrder = indexH;
            this.map.AddObject(this.image);
            this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
        }
        this.wayPoints = this.wayPoints1;
        this.nextWayPoints = this.wayPoints2;
        this.nextWayPoints = checkPoints.reverse();
        Laya.timer.frameLoop(1, this, this.Update);
    }
    Character.prototype.GetX = function () {
        return this.image.x + GameMap.nodeLength / 2;
    };
    Character.prototype.GetY = function () {
        return this.image.y + GameMap.nodeLength / 2;
    };
    Character.prototype.SetActive = function (active) {
        this.isActive = active;
    };
    Character.prototype.Update = function () {
        if (!this.isActive)
            return;
        if (this.status == PlayerStatus.Idle) {
            if (this.nextWayPoints.length != 0)
                this.Move();
        }
        else if (this.status == PlayerStatus.Move) {
            var currentPosW = this.image.x;
            var currentPosH = this.image.y;
            var destPosW = this.map.GetPosW(this.indexW);
            var destPosH = this.map.GetPosH(this.indexH);
            var valueW = destPosW - currentPosW;
            var valueH = destPosH - currentPosH;
            if (this.dirLength != 0) {
                currentPosW += Laya.timer.delta / 1000 * this.moveSpeed * GameMap.globalSpeed * this.dirW / this.dirLength;
                currentPosH -= Laya.timer.delta / 1000 * this.moveSpeed * GameMap.globalSpeed * this.dirH / this.dirLength;
            }
            if (valueW * (destPosW - currentPosW) <= 0 &&
                valueH * (destPosH - currentPosH) <= 0) {
                currentPosH = destPosH;
                currentPosW = destPosW;
                this.CheckNextWayPoint();
            }
            this.image.pos(currentPosW, currentPosH);
        }
    };
    Character.prototype.CheckNextWayPoint = function () {
        if (this.dirLength != 0 && this.blockable)
            this.map.ReSetStatus(this.indexH - this.dirH, this.indexW - this.dirW);
        if (this.wayPoints.length == 0)
            this.status = PlayerStatus.Idle;
        else {
            var n = this.wayPoints.pop();
            this.nextWayPoints.push(n);
            if (this.map.IsWalkable(n.indexH, n.indexW)) {
                this.dirH = n.indexH - this.indexH;
                this.dirW = n.indexW - this.indexW;
                this.dirLength = Math.sqrt(this.dirH * this.dirH + this.dirW * this.dirW);
                this.indexH = n.indexH;
                this.indexW = n.indexW;
                if (this.blockable)
                    this.map.SetStatus(this.indexH, this.indexW, NodeStatus.Block);
                this.image.zOrder = this.indexH;
            }
            else
                this.status = PlayerStatus.Idle;
        }
    };
    Character.prototype.Move = function () {
        var tmp = this.wayPoints;
        this.wayPoints = this.nextWayPoints;
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
    Character.prototype.ClassName = function () {
        return "Character";
    };
    Character.prototype.GetRect = function () {
        var x = this.image.x;
        var y = this.image.y;
        return new Rectangle(x, y, this.image.width - 1, this.image.height - 1);
    };
    Character.prototype.Intersects = function (rect) {
        return this.GetRect().intersects(rect);
    };
    return Character;
}());
//# sourceMappingURL=Character.js.map