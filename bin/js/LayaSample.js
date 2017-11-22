// 程序入口
var Sprite = Laya.Sprite;
var Stage = Laya.Stage;
var Texture = Laya.Texture;
var Browser = Laya.Browser;
var Handler = Laya.Handler;
var WebGL = Laya.WebGL;
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#232628";
        var ape = new Sprite();
        Laya.stage.addChild(ape);
        ape.loadImage("../laya/assets/Map/map.png");
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map