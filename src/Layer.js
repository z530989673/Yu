/*
* name;
*/
var Layer = /** @class */ (function () {
    function Layer() {
        this.background = new Sprite();
        this.background.zOrder = 0;
        this.background.pos(0, 0);
        this.map = new Sprite();
        this.map.zOrder = 1;
        this.map.pos(0, 0);
        this.objects = new Sprite();
        this.objects.zOrder = 2;
        this.objects.pos(0, 0);
        this.foregroundFar = new Sprite();
        this.foregroundFar.zOrder = 3;
        this.foregroundFar.pos(0, 0);
        this.foregroundMid = new Sprite();
        this.foregroundMid.zOrder = 4;
        this.foregroundMid.pos(0, 0);
        this.foregroundNear = new Sprite();
        this.foregroundNear.zOrder = 5;
        this.foregroundNear.pos(0, 0);
        this.ui = new Sprite();
        this.ui.zOrder = 5;
        this.ui.pos(0, 0);
        Laya.stage.addChild(this.background);
        Laya.stage.addChild(this.map);
        Laya.stage.addChild(this.objects);
        Laya.stage.addChild(this.foregroundFar);
        Laya.stage.addChild(this.foregroundMid);
        Laya.stage.addChild(this.foregroundNear);
        Laya.stage.addChild(this.ui);
    }
    Layer.GetInstance = function () {
        if (Layer.m_instance == null)
            Layer.m_instance = new Layer();
        return Layer.m_instance;
    };
    Layer.AddBackground = function (s) {
        Layer.GetInstance().background.addChild(s);
    };
    Layer.AddMap = function (s) {
        Layer.GetInstance().map.addChild(s);
    };
    Layer.AddObjects = function (s) {
        Layer.GetInstance().objects.addChild(s);
    };
    Layer.AddForeGroundFar = function (s) {
        Layer.GetInstance().foregroundFar.addChild(s);
    };
    Layer.AddForeGroundMid = function (s) {
        Layer.GetInstance().foregroundMid.addChild(s);
    };
    Layer.AddForeGroundNear = function (s) {
        Layer.GetInstance().foregroundNear.addChild(s);
    };
    Layer.AddUI = function (s) {
        Layer.GetInstance().ui.addChild(s);
    };
    Layer.ResetLayer = function () {
        Layer.GetInstance().background.removeChildren();
        Layer.GetInstance().map.removeChildren();
        Layer.GetInstance().objects.removeChildren();
        Layer.GetInstance().foregroundFar.removeChildren();
        Layer.GetInstance().foregroundMid.removeChildren();
        Layer.GetInstance().foregroundNear.removeChildren();
    };
    return Layer;
}());
//# sourceMappingURL=Layer.js.map