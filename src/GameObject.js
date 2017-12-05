/*
* name;
*/
var GameObject = /** @class */ (function () {
    function GameObject(m, path, indexH, indexW, sH, sW, blockable) {
        this.indexW = 0;
        this.indexH = 0;
        this.sizeW = 1;
        this.sizeH = 1;
        this.blockable = false;
        this.map = m;
        this.indexW = indexW;
        this.indexH = indexH;
        this.sizeH = sH;
        this.sizeW = sW;
        this.blockable = blockable;
        if (path != "") {
            this.image = new CustomSprite(path);
            //this.image.zOrder = - indexH;
            this.map.AddObject(this.image);
            this.image.pos(m.GetPosW(indexW), m.GetPosH(indexH));
            this.image.scale(GameMap.nodeLength / 128, GameMap.nodeLength / 128);
        }
    }
    GameObject.prototype.GetRect = function () {
        var x = this.image.x;
        var y = this.image.y;
        return new Rectangle(x, y, this.image.width * GameMap.nodeLength / 128 - 1, this.image.height * GameMap.nodeLength / 128 - 1);
    };
    GameObject.prototype.Intersects = function (rect) {
        return this.GetRect().intersects(rect);
    };
    return GameObject;
}());
//# sourceMappingURL=GameObject.js.map